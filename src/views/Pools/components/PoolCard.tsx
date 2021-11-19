import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton, useModal, AddIcon, Image, Flex, MinusIcon, LinkExternal, Link } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import { useERC20 } from 'hooks/useContract'
import { useSousApprove } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { useSousHarvest } from 'hooks/useHarvest'
import Balance from 'components/Balance'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import { FaArrowAltCircleDown, FaArrowRight, FaBook, FaBox, FaClock, FaCube, FaCubes, FaFire, FaFlask, FaLightbulb, FaLock, FaMountain, FaScroll, FaSeedling, FaTractor } from 'react-icons/fa'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import CompoundModal from './CompoundModal'
import CardTitle from './CardTitle'
import Card from './Card'
import HarvestButton from './HarvestButton'
import CardFooter from './CardFooter'


interface PoolWithApy extends Pool {
  apy: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
}



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


const PoolCard: React.FC<HarvestProps> = ({ pool }) => {
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
    userData,
    stakingLimit,
    tokenPoolAddress,
    quoteTokenPoolAddress,
    earnToken,
  } = pool
  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const TranslateString = useI18n()
  const stakingTokenContract = useERC20(stakingTokenAddress)
  const { account } = useWallet()
  const block = useBlock()
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  const { onStake } = useSousStake(sousId, isBnbPool)
  const { onUnstake } = useSousUnstake(sousId)
  const { onReward } = useSousHarvest(sousId, isBnbPool)
  console.log("PoolCard", pool)
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)
  const blocksUntilStart = Math.max(startBlock - block, 0)
  const blocksRemaining = Math.max(endBlock - block, 0)
  const hsRemaining = Math.ceil((endBlock - block)*2*0.000277778*0.0416667)
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

  const APR = apy && apy.toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 })
  const ROI = apy && apy.div(365).toNumber().toLocaleString('en-us',{ maximumFractionDigits: 2 })
  const TVL = pool.tvl && pool.tvl.toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 })

  const staked = getBalanceNumber(stakedBalance).toLocaleString('en-us',{ maximumFractionDigits: 2 })
  const earned = getBalanceNumber(earnings, tokenDecimals).toLocaleString('en-us',{ maximumFractionDigits: 2 })

  return (
    <Card isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
      <div>

        <object type="image/svg+xml" data={`/images/incubator/${earnToken}.svg`} width="300px">s</object>

        <Flex justifyContent='space-between'>
          <LightText>APR</LightText>
          <Quote>{APR}%</Quote>
        </Flex>

        <Flex justifyContent='space-between'>
          <LightText>Ends In</LightText>
          <Quote>{hsRemaining} Days</Quote>
        </Flex>

        <Flex justifyContent='space-between'>
          <LightText>TVL</LightText>
          <Quote>${TVL}</Quote>
        </Flex>

        <Link href={projectLink} style={{'color':'white'}} target="_blank" >
          <Quote> About The Project <FaArrowRight/></Quote>
        </Link>

        <Flex justifyContent='space-between' marginTop='15px'>
          <Quote>Staked</Quote>
          <Quote>{staked}</Quote>
        </Flex>

        <Flex marginTop='2px' justifyContent='space-between'>
          <Quote>{tokenName} Earned</Quote>
          <Quote>{earned}</Quote>
        </Flex>

        <StyledCardActions>
          {!account && <UnlockButton />}
          {account &&
            (needsApproval && !isOldSyrup ? (
              <div style={{ flex: 1 }}>
                <Button disabled={isFinished || requestedApproval} marginTop='10px' onClick={handleApprove} fullWidth >
                  Approve
                </Button>
              </div>
            ) : (
              <>
                <IconButton marginTop='10px' marginLeft='0px'
                  disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                  onClick={
                    isOldSyrup
                      ? async () => {
                          setPendingTx(true)
                          await onUnstake('0')
                          setPendingTx(false)
                        }
                      : onPresentWithdraw
                  }>
                <MinusIcon color="background" />
                </IconButton>

                <StyledActionSpacer />

                {!isOldSyrup && (
                <IconButton marginTop='10px' marginRight='0px' disabled={isFinished && sousId !== 0} onClick={onPresentDeposit}>

                  <AddIcon color="background" />
                </IconButton>)}
              </>
            ))}

<div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', marginLeft:'15px' }}>
          {account && harvest && !isOldSyrup && (
            <Button
              disabled={!earnings.toNumber() || pendingTx}
              onClick={async () => {
                setPendingTx(true)
                await onReward()
                setPendingTx(false)
              }}
              style={{
                'borderRadius': '5px',
                'height': '47px',
                'width': '120px',
                'color': 'white'
              }}
            >
              {TranslateString(9929, 'Settle')}
            </Button>
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
  margin-top: 15px;
  width: 100%;
  margin-bottom: 15px;
  box-sizing: border-box;
`

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  display: flex;
  font-size: 14px;
`

export default PoolCard
