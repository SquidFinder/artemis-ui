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

const StyledButton = styled.button`
  align-items: center;
  display: inline-flex;

  border: 1px solid #555977;
  background-image: linear-gradient(#555977, #2F324A);
  border-radius: 10px;
  height: 35px;
  width: 38px;

  color: #FFFFF;
  font-size: 13px;
  font-weight: 300;
  padding: 13.5px;

  box-shadow: 0px 0px 0px #ccc;
  text-shadow: 0px 0px 0px #ccc;

  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    outline: 0;
    border-color: #FAFAFA;
    cursor: pointer;
  }
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
  const displayBalanceUsd = rawStakedBalanceUsd.toLocaleString('en-us', { maximumFractionDigits: 1, minimumFractionDigits: 1 })
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
    return (
      <IconButtonWrapper>

        <StyledButton
          onClick={onPresentWithdraw}
          style={{ justifyContent:"center" }}>
          <FaMinus/>
        </StyledButton>

        <StyledButton
          onClick={onPresentDeposit}
          style={{ justifyContent:"center", marginLeft:'5px'  }}>
          <FaPlus/>
        </StyledButton>

      </IconButtonWrapper>
    )
  }

  return (
    <Flex justifyContent="space-between" alignItems="center"> 
      <Heading  style={{fontSize:'14px', alignItems:'start'}} color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>
        <Staked style={{ textShadow:'0px 0px 0px #fff'}}>${displayBalanceUsd} In LP</Staked>
        <USDStaked>Deposited</USDStaked>
      </Heading>
      {renderStakingButtons()}
    </Flex>
  )
}

export default StakeAction
