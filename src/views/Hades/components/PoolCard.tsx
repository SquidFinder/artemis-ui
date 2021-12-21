import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton, useModal, AddIcon, Image, Flex, MinusIcon } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import { useERC20 } from 'hooks/useContract'
import { useSousApprove, useSousApproveBurn } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useSousStake, useSousStakeBurn } from 'hooks/useStake'
import { useSousUnstake, useSousUnstakeBurn } from 'hooks/useUnstake'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { useSousHarvestBurn } from 'hooks/useHarvest'
import Balance from 'components/Balance'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool2 } from 'state/types'
import { FaBurn, FaClock, FaCube, FaCubes, FaFire, FaFireAlt, FaFlask, FaLightbulb, FaLock, FaMonero, FaMountain, FaScroll, FaSeedling, FaTractor, FaTruck } from 'react-icons/fa'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import CompoundModal from './CompoundModal'
import CardTitle from './CardTitle'
import Card from './Card'
import OldSyrupTitle from './OldSyrupTitle'
import HarvestButton from './HarvestButton'
import CardFooter from './CardFooter'


const Quote = styled.p`
    font-size: 15px;
    margin-bottom: 0px;
`

interface PoolWithApy extends Pool2 {
  apy: BigNumber
}

interface HarvestProps {
  pool2: PoolWithApy
}

const Divider = styled.div`
background-color: #2F324A;
height: 2px;
margin-left: auto;
margin-right: auto;
margin-top: 0px;
margin-bottom: 5px;
width: 100%;
`

const PoolCard: React.FC<HarvestProps> = ({ pool2 }) => {
  const {
    sousId,
    image,
    tokenName,
    stakingTokenName,
    stakingTokenAddress,
    projectLink,
    harvest,
    apy,
    tokenDecimals,
    poolCategory,
    totalStaked,
    startBlock,
    endBlock,
    isFinished,
    isDepositFinished,
    userData,
    stakingLimit,
    tokenPoolAddress,
    quoteTokenPoolAddress,
    lockBlock,
  } = pool2
  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const TranslateString = useI18n()
  const stakingTokenContract = useERC20(stakingTokenAddress)
  const { account } = useWallet()
  const block = useBlock()
  const { onApprove } = useSousApproveBurn(stakingTokenContract, sousId)
  const { onStake } = useSousStakeBurn(sousId, isBnbPool)
  const { onUnstake } = useSousUnstakeBurn(sousId)
  const { onReward } = useSousHarvestBurn(sousId, isBnbPool)
  console.log("PoolCard", pool2)
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)
  const daysRemaining = Math.ceil((endBlock - block) * 2 * 0.000277778 * 0.0416667)
  const blocksDepositFinished = Math.max(lockBlock - block, 0)
  const isOldSyrup = stakingTokenName === QuoteToken.SYRUP
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isBnbPool
  const isCardActive = isFinished && accountHasStakedBalance
  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={onStake}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
    />,
  )

  const [onPresentCompound] = useModal(
    <CompoundModal earnings={earnings} onConfirm={onStake} tokenName={stakingTokenName} />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={stakingTokenName} />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])

  const APR = apy && apy.toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })
  const ROI = apy && apy.div(6).toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })
  const DailyROI = apy && apy.div(6).div(60).toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })
  const TVL = pool2.tvl && pool2.tvl.toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })
  const claimable = getBalanceNumber(earnings, tokenDecimals).toLocaleString('en-us', { maximumFractionDigits: 0 })
  const bal = getBalanceNumber(stakedBalance).toLocaleString('en-us', { maximumFractionDigits: 0 })
  return (
    <Card isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
      {sousId === 0 && <PoolFinishedSash />}
      <div style={{ padding: '34px' }}>
        <Flex justifyContent='space-between' marginBottom='10px'>
          <TxtBig>MIS Hades Pool</TxtBig>
        </Flex>
        <Flex justifyContent='space-between' marginTop='0px'>
          <Txt>TVL</Txt>
          <Txt>${TVL} </Txt>
        </Flex>
        <Flex justifyContent='space-between' marginTop='0px'>
          <Txt>Ends In</Txt>
          <Txt>{daysRemaining} Days</Txt>
        </Flex>
        <Divider/>
        <Flex justifyContent='space-between'>
          <TxtWhite>Burned MIS</TxtWhite>
          <TxtWhite>{bal}</TxtWhite>
        </Flex>
        <Flex marginTop='0px' justifyContent='space-between'>
          <TxtWhite>Pending Rewards</TxtWhite>
          <TxtWhite>{claimable}</TxtWhite>
          {sousId === 0 && account && harvest && (
            <HarvestButton
              disabled={!earnings.toNumber() || pendingTx}
              text={pendingTx ? TranslateString(999, 'Compounding') : TranslateString(999, 'Compound')}
              onClick={onPresentCompound} />)}
        </Flex>

        <StyledCardActions>
          <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
            {account && harvest && !isOldSyrup && (
              <ClaimBTN
                disabled={!earnings.toNumber() || pendingTx}
                onClick={async () => {
                  setPendingTx(true)
                  await onReward()
                  setPendingTx(false)
                }}
                style={{
                  justifyContent:'center'
                }}
              >
                {TranslateString(9929, 'Claim Rewards')}
              </ClaimBTN>
            )}
          </div>
        </StyledCardActions>
      </div>
    </Card>
  )
}

const PoolFinishedSash = styled.div`
  background-image: url('/images/pool-finished-sash.svg');
  background-position: top right;
  background-repeat: not-repeat;
  height: 135px;
  position: absolute;
  right: -24px;
  top: -24px;
  width: 135px;
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  width: 100%;
  box-sizing: border-box;
`

const Txt = styled.text`
  font-size: 13px;
  align-items: center;
  color: #8E8E8E;
  display: flex;
  margin-top: 3px;
  justify-content: flex-start;
`

const TxtWhite = styled.text`
  font-size: 13px;
  align-items: center;
  color: #ffff;
  display: flex;
  margin-top: 3px;
  justify-content: flex-start;
`

const TxtBig = styled.text`
  font-size: 15px;
  align-items: center;
  color: #ffff;
  display: flex;
  margin-top: 3px;
  justify-content: flex-start;
`

const ClaimBTN = styled.button`
  display: inline-flex;
  align-items: center;
  background-image: linear-gradient(#2F324A, #2F324A);
  border-radius: 10px;
  border: 1px solid #CECECE;
  height: 42px;
  width: 125px;
  color: #FFFF;
  font-size: 13.5px;
  font-weight: 400;
  padding: 10px;
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

export default PoolCard
