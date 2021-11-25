import React, { useMemo, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { provider } from 'web3-core'
import { getContract } from 'utils/erc20'
import { Button, Flex, LinkExternal, Text } from '@pancakeswap-libs/uikit'
import { Farm } from 'state/types'
import {useFarmFromPid, useFarmFromSymbol, useFarmTokensToUsd, useFarmUser, usePriceCakeBusd} from 'state/hooks'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'
import { useApprove } from 'hooks/useApprove'
import ReactTooltip from 'react-tooltip';
import labo from 'config/constants/labo'
import { FaCheck } from 'react-icons/fa'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'

const Action = styled.div`
  padding-top: 16px;
`
export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  ethereum?: provider
  account?: string
}

const StyledBtn = styled.button`
  display: inline-flex;
  align-items: center;
  
  background-image: linear-gradient(#2F324A, #2F324A);
  border-radius: 10px;
  border: 1px solid #CECECE;
  height: 42px;
  width: 200px;

  color: #FFFF;
  font-size: 13.5px;
  font-weight: 400;
  padding: 15px;
  
  margin-top: 15px;
  margin-bottom: 20px;

  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    outline: 0;
    border-color: #FFFF;
    cursor: pointer;
    box-shadow: 0px 0px 2px #fff;
    text-shadow: 0px 0px 0px #fff;
  }
  `

const Divider = styled.div`
  margin-bottom: 0px;
  width: 0%;
`

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, ethereum, account }) => {
  const TranslateString = useI18n()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses, tokenAddresses, isTokenOnly, depositFeeBP } = useFarmFromPid(farm.pid)
  const { allowance, tokenBalance, stakedBalance, earnings } = useFarmUser(pid)
  const lpAddress = lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const tokenAddress = tokenAddresses[process.env.REACT_APP_CHAIN_ID];
  const lpName = farm.lpSymbol.toUpperCase()
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const tokenBalanceUsd = useFarmTokensToUsd(pid, tokenBalance)
  const stakedBalanceUsd = useFarmTokensToUsd(pid, stakedBalance.div(new BigNumber(10).pow(18)))

  // console.log("StakedBalance", farm.pid, stakedBalance && stakedBalance.toNumber())
  // console.log("StakedBalanceUsd", farm.pid, stakedBalanceUsd && stakedBalanceUsd.toNumber())
  // console.log(pid)
  // console.log(tokenBalanceUsd)
  // console.log(stakedBalanceUsd)

  const lpContract = useMemo(() => {
    if(isTokenOnly){
      return getContract(ethereum as provider, tokenAddress);
    }
    return getContract(ethereum as provider, lpAddress);
  }, [ethereum, lpAddress, tokenAddress, isTokenOnly])
  const { onApprove } = useApprove(lpContract)
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])
  const Box = styled.p`
`
  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <Box>
        <HarvestAction earnings={earnings} pid={pid}/>
        <StakeAction         
          stakedBalance={stakedBalance}
          stakedBalanceUsd={stakedBalanceUsd}
          tokenBalance={tokenBalance}
          tokenBalanceUsd={tokenBalanceUsd}
          tokenName={lpName} pid={pid}
          depositFeeBP={depositFeeBP}/>
      </Box> 
      ) 
      : 
      (
      <span>
        <StyledBtn 
        style={{justifyContent:'center'}} 
        disabled={requestedApproval || labo.isLocked.unlockWalletButton} 
        onClick={handleApprove}>
          {TranslateString(999, 'Enable')}&nbsp;{lpName}&nbsp;
        </StyledBtn>
      </span>
      )
  }

  return (
    <Action>
      {!account ? 
      <Divider/> 
      : 
      renderApprovalOrStakeButton()}
    </Action>
  )
}

export default CardActions
