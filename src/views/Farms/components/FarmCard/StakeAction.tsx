import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, IconButton, AddIcon, MinusIcon, useModal } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import { FaArrowAltCircleDown, FaArrowDown, FaLongArrowAltDown, FaMinus, FaPlus } from 'react-icons/fa'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'
import './index.css'

interface FarmCardActionsProps {
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  stakedBalanceUsd?: BigNumber
  tokenBalanceUsd?: BigNumber
  tokenName?: string
  pid?: number
  depositFeeBP?: number
}

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

const StyledBtn = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-image: linear-gradient(#555977, #2F324A);
  border-radius: 15px;
  border:1px solid #CECECE;
  border-color: #ffff !important;
  border-radius: 10px;
  color: #FFFF;
  font-size: 13px;
  font-weight: 300;
  display: inline-flex;
  height: 35px;
  width: 70px;
  padding: 15px;
  box-shadow: 0px 0px 0px #ccc;
  text-shadow: 0px 0px 0px #ccc;
`
const StyledBtn2 = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background: #2F324A;
  border-radius: 15px;
  border:1px solid #CECECE;


  background-image: linear-gradient(#555977, #2F324A);

  border-radius: 10px;
  color: #FFFF;
  font-size: 13px;
  font-weight: 300;
  display: inline-flex;
  height: 35px;
  width: 38px;
  padding: 13.5px;
  box-shadow: 0px 0px 0px #ccc;
  text-shadow: 0px 0px 0px #ccc;
`

const Staked = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.textSubtle};
`

const USDStaked = styled.text`
  font-size: 13px;
  align-items: center;
  color: #8E8E8E;
  display: flex;
  margin-top: 3px;
  justify-content: flex-start;
`

const StakeAction: React.FC<FarmCardActionsProps> = (
    { stakedBalance,
      tokenBalance,
      stakedBalanceUsd,
      tokenBalanceUsd,
      tokenName,
      pid,
      depositFeeBP
    }) => {
  const TranslateString = useI18n()
  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)

  const rawStakedBalance = getBalanceNumber(stakedBalance, 18)
  const displayBalance = rawStakedBalance.toLocaleString()
  const rawStakedBalanceUsd = getBalanceNumber(stakedBalanceUsd, 0)
  const displayBalanceUsd = rawStakedBalanceUsd.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

  const tokenBalanceUsdNum = getBalanceNumber(tokenBalanceUsd)

  const [onPresentDeposit] = useModal(<DepositModal
      max={tokenBalance}
      valueUsd={tokenBalanceUsdNum}
      onConfirm={onStake}
      tokenName={tokenName}
      depositFeeBP={depositFeeBP} />)
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
        max={stakedBalance}
        valueUsd={rawStakedBalanceUsd}
        onConfirm={onUnstake}
        tokenName={tokenName} />,
  )

  const renderStakingButtons = () => {
    return rawStakedBalance === 0 ? (
      <StyledBtn 
      onClick={onPresentDeposit} 
      style={{justifyContent:"center"}}> 
      {TranslateString(999, 'Stake')}
      </StyledBtn>
    ) : (
      <IconButtonWrapper>

        <StyledBtn2
          onClick={onPresentWithdraw}
          style={{ justifyContent:"center" }}>
          <FaMinus/>
        </StyledBtn2>

        <StyledBtn2
          onClick={onPresentDeposit}
          style={{ justifyContent:"center", marginLeft:'5px'  }}>
          <FaPlus/>
        </StyledBtn2>

      </IconButtonWrapper>
    )
  }

  return (
    <Flex justifyContent="space-between" alignItems="center"> 
      <Heading  style={{fontSize:'17px'}} color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>
        <Staked style={{ textShadow:'0px 0px 5px #fff'}}>
          {displayBalance}
        </Staked>
        {stakedBalance.gt(0) && <USDStaked>${displayBalanceUsd}</USDStaked>}
      </Heading>
      {renderStakingButtons()}
    </Flex>
  )
}

export default StakeAction
