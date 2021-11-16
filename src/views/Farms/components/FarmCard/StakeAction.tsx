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
  background-color: #292C44;
  border: 0px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 10px;
  color: #FFFF;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  display: inline-flex;
  min-height: 18px;
  max-height: 30px;
  max-width: 95px;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  text-shadow: 0px 0px 5px #ccc;
`
const StyledBtn2 = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-color: #292C44;
  border: 0px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 10px;
  color: #FFFF;
  font-size: 15px;
  font-weight: 500;
  width: 100%;
  display: inline-flex;
  min-height: 16px;
  max-height: 28px;
  max-width: 45px;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
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
      <StyledBtn 
      onClick={onPresentDeposit} 
      style={{justifyContent:"center"}}> 
      {TranslateString(999, 'Stake')}<FaLongArrowAltDown />
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

  const USDStaked = styled.text`
  font-size: 13px;
  align-items: center;
  color: #8E8E8E;
  display: flex;
  margin-top: 3px;
  justify-content: flex-start;
`

const Staked1 = styled.text`
  font-size: 13px;
  align-items: center;
  color: #8E8E8E;
  display: flex;
  margin-top: 3px;
  justify-content: flex-start;
`
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
