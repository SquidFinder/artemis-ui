import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, IconButton, AddIcon, MinusIcon, useModal } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
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

const Staked = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.textSubtle};
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
      <Button onClick={onPresentDeposit} style={{'borderRadius': '5px'}}>{TranslateString(999, 'Stake')}</Button>
    ) : (
      <IconButtonWrapper>
        <IconButton variant="primary" style={{'borderRadius': '5px'}} onClick={onPresentWithdraw} mr="6px">
          <MinusIcon className="minusplus" fill='white'/>
        </IconButton>
        <IconButton variant="primary" style={{'borderRadius': '5px'}} onClick={onPresentDeposit}>
          <AddIcon className="minusplus" color="white"/>
        </IconButton>
      </IconButtonWrapper>
    )
  }

  const USDStaked = styled.text`
  font-size: 15px;
  align-items: center;
  color: #8E8E8E;
  display: flex;
  margin-top: 3px;
  justify-content: flex-start;
`
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Heading color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>
        <Staked>
          {displayBalance}
        </Staked>
        {stakedBalance.gt(0) && <USDStaked>~${displayBalanceUsd}</USDStaked>}
      </Heading>
      {renderStakingButtons()}
    </Flex>
  )
}

export default StakeAction
