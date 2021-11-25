import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useModal, Flex } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import { useERC20 } from 'hooks/useContract'
import { useSousApprove, useSousApprove3 } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useSousStake, useSousStake3 } from 'hooks/useStake'
import { useSousUnstake, useSousUnstake3 } from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import { useSousHarvest, useSousHarvest3 } from 'hooks/useHarvest'
import Balance from 'components/Balance'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool, Pool3 } from 'state/types'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { FaExternalLinkAlt, FaGithub, FaLongArrowAltRight } from 'react-icons/fa'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import Card from './Card'
import {usePriceCakeBusd} from "../../../state/hooks";

const Quote = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  text-shadow: 0px 0px 5px #ccc;
`

const LightText = styled.p`
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 0px;
    text-shadow: 0px 0px 0px #ccc;
    color: #8E8E8E;
`

const StakeTitle = styled.p`
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 0px;
    text-shadow: 0px 0px 5px #ccc;
    color: #ffff;
    margin-left: 10px;
    margin-top: 3px;
`

const Wrapper = styled(Flex)`
  svg {
    margin-right: 0.25rem;
  }
`

const StyledBtn = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-image: linear-gradient(#555977, #2F324A);
  border-radius: 15px;
  border:1px solid;
  border-color: #555977 !important;
  border-radius: 10px;
  color: #FFFF;
  font-size: 13px;
  font-weight: 300;
  display: inline-flex;
  height: 37px;
  width: 80px;
  padding: 15px;
  box-shadow: 0px 0px 0px #ccc;
  text-shadow: 0px 0px 0px #ccc;
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  width: 100%;
  margin-bottom: 15px;
  box-sizing: border-box;
`


const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`



interface PoolWithApy extends Pool3 {
  apy: BigNumber
  apr: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
}

const PoolCard: React.FC<HarvestProps> = ({ pool }) => {
  const {
    sousId,
    stakingTokenName,
    stakingTokenAddress,
    apr,
    apy,
    tokenDecimals,
    poolCategory,
    isFinished,
    userData,
    stakingLimit,
    pricePerShare
  } = pool

  const isBnbPool = poolCategory === PoolCategory.BINANCE;
  const stakingTokenContract = useERC20(stakingTokenAddress);
  const { account } = useWallet();

  const { onApprove } = useSousApprove3(stakingTokenContract, sousId);
  const { onStake } = useSousStake3(sousId, isBnbPool);
  const { onUnstake } = useSousUnstake3(sousId);
  const { onReward } = useSousHarvest3(sousId, isBnbPool);

  const MISPrice = usePriceCakeBusd();
  const [requestedApproval, setRequestedApproval] = useState(false);
  const [pendingTx, setPendingTx] = useState(false);
  const allowance = new BigNumber(userData?.allowance || 0);
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0);
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0);
  const stakedBalanceUsd = stakedBalance.times(MISPrice);
  const earnings = new BigNumber(userData?.pendingReward || 0);
  const isOldSyrup = stakingTokenName === QuoteToken.SYRUP;
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0;
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isBnbPool;
  const isCardActive = isFinished && accountHasStakedBalance;
  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals));

  // Deposit
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={onStake}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
    />,
  )

  // Withdrawal
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={stakingTokenName} pricePerShare={pricePerShare} />,
  )

  // Staking contract Approval
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // User rejected tx or didn't go through
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])


  // Frontend Calculations
  const TVL = pool.tvl && pool.tvl.toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 });
  const APY = apy && apy.toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 });
  const APR = apr && apr.toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 });

  const WeeklyROI = apr && apr.div(52).times(7).toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 });
  const StakedUSDBalance = getBalanceNumber(stakedBalanceUsd).toLocaleString('en-us',{ maximumFractionDigits: 0 })
  const StakedBalance = getBalanceNumber(stakedBalance).toLocaleString('en-us',{ maximumFractionDigits: 0 })
  const ExpectedBalanceMonth = apr && apr.div(12).times(0.01).times(getBalanceNumber(stakedBalanceUsd)).plus(getBalanceNumber(stakedBalanceUsd)).toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 });

  return (
    <Card isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
      <div>
        <Flex justifyContent='left' marginBottom='20px'>
          <object type="image/svg+xml" data='/images/core/logo2.svg' width="30px">&nbsp;</object> 
          <StakeTitle>MIS Staking</StakeTitle>
        </Flex>
        <Flex justifyContent='space-between'>
          <LightText>tAPY</LightText>
          <Quote>{APY}%</Quote>
        </Flex>
        <Flex justifyContent='space-between'>
          <LightText>Weekly ROI</LightText>
          <Quote>{WeeklyROI}%</Quote>
        </Flex>
        <Flex justifyContent='space-between'>
          <LightText>Total Staked MIS</LightText>
          <Quote>${TVL}</Quote>
        </Flex>
        <Flex justifyContent='space-between'>
          <LightText>Your Staked MIS</LightText>
          <Quote>{StakedBalance} (${StakedUSDBalance})</Quote>
        </Flex>


        <Wrapper alignItems="end">
          <Flex alignItems="end">
            <StyledCardActions style={{alignItems:"end"}}>
            {!account && <UnlockButton />}
            {account && (needsApproval && !isOldSyrup ? (
              <div style={{ flex: 1 }}>
                <StyledBtn
                  style={{minWidth:'100px', maxWidth:'150px', boxShadow:'0px 0px 5px #fff', 'marginTop':'10px'}}
                  disabled={isFinished || requestedApproval}
                  onClick={handleApprove}>
                  Enable Staking
                </StyledBtn>
              </div>
            ) : ( <>
              <StyledBtn 
                style={{ justifyContent:"center", marginTop: '20px', marginRight:'10px' }}
                disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                onClick={ isOldSyrup ? async () => {
                  setPendingTx(true)
                  await onUnstake('0')
                  setPendingTx(false)} : onPresentWithdraw }>
                Unstake
              </StyledBtn>
              <StyledActionSpacer/>
              {!isOldSyrup && (
                <StyledBtn
                  style={{ justifyContent:"center" }}
                  disabled={isFinished && sousId !== 0} 
                  onClick={onPresentDeposit}>
                  Stake
                </StyledBtn>)} </> ))}
              </StyledCardActions>  
            </Flex>
          </Wrapper>
      </div>
    </Card>
  )
}

export default PoolCard
