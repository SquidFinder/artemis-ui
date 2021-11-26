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
background-color: #4c68ef;
height: 2px;
margin-left: auto;
margin-right: auto;
margin-top: 20px;
margin-bottom: 5px;
width: 100%;
`

const Divider2 = styled.div`
background-color: #4c68ef;
height: 2px;
margin-left: auto;
margin-right: auto;
margin-top: 20px;
margin-bottom: 5px;
width: 0%;
`

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 12px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
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

  const blocksUntilStart = Math.max(startBlock - block, 0)

  const blocksRemaining = Math.max(endBlock - block, 0)

  const daysRemaining = Math.ceil((endBlock - block)*2*0.000277778*0.0416667)


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

  const APR = apy && apy.toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 })

  const ROI = apy && apy.div(6).toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 })

  const DailyROI = apy && apy.div(6).div(60).toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 })


  const TVL = pool2.tvl && pool2.tvl.toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 })

  return (
    <Card isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
      {sousId === 0 && <PoolFinishedSash />}

      <div style={{padding: '34px'}}>
          <object type="image/svg+xml" data={`/images/burn/${tokenName}.png`} width="300px">&nbsp;</object>

        <Divider2/>
        

        {/*
        <Flex justifyContent='space-between' marginTop='6px'>
          <span><FaLock/> Lockup</span>
          <Quote>{TranslateString(10006, '0 Hours')}</Quote>
        </Flex> 
        */}

          <Flex justifyContent='space-between' marginTop='6px'>
              <span><FaTractor/> ROI</span>
              <Quote>{ROI}%</Quote>
            </Flex>
            <Flex justifyContent='space-between' marginTop='6px'>
              <span><FaSeedling/> Daily ROI</span>
              <Quote>{DailyROI}%</Quote>
            </Flex>         


            {/* <Flex justifyContent='space-between' marginTop='6px'>
              <span><FaMountain/> Annualized ROI</span>
              <Quote>{APR}%</Quote>
          </Flex> */  }



            
          <Flex justifyContent='space-between' marginTop='6px'>
            <span><FaScroll/> MIS Burnt</span>
            <Quote>${TVL} </Quote>
          </Flex> 


          <Flex justifyContent='space-between' marginTop='6px'>
              <span><FaClock/> Ends In</span>
              <Quote>~{daysRemaining} Days  </Quote>
            </Flex>



        <Divider />


      
        <Flex justifyContent='space-between' marginTop='25px'>
          <span><FaFireAlt/> Your Burnt MIS</span>
          <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(stakedBalance)} />
        </Flex>

        <Flex marginTop='0px' justifyContent='space-between'>
          <span><FaSeedling/> Pending Rewards</span>
          <Balance value={getBalanceNumber(earnings, tokenDecimals)} isDisabled={isFinished} />

          {sousId === 0 && account && harvest && (
              <HarvestButton
                disabled={!earnings.toNumber() || pendingTx}
                text={pendingTx ? TranslateString(999, 'Compounding') : TranslateString(999, 'Compound')}
                onClick={onPresentCompound}/>)} 
        </Flex>



        {/* {!isOldSyrup ? (
          <BalanceAndCompound>
            <Balance value={getBalanceNumber(earnings, tokenDecimals)} isDisabled={isFinished} />
            {sousId === 0 && account && harvest && (
              <HarvestButton
                disabled={!earnings.toNumber() || pendingTx}
                text={pendingTx ? TranslateString(999, 'Compounding') : TranslateString(999, 'Compound')}
                onClick={onPresentCompound}
              />
              
            )}
          </BalanceAndCompound>
        ) : (
          <OldSyrupTitle hasBalance={accountHasStakedBalance} />
        )}
        <Label isFinished={isFinished && sousId !== 0} text={TranslateString(330, `${tokenName} earned`)} />
        */}

        <StyledCardActions  >
          
          {!account && <UnlockButton />}
          {account &&
            (needsApproval && !isOldSyrup ? (
              <div style={{ flex: 1 }}>
                <Button disabled={isFinished || isDepositFinished} marginTop='20px' onClick={handleApprove} fullWidth >
                  Approve
                </Button>
              </div>
            ) : (
              <>

                <StyledActionSpacer />

                {!isOldSyrup && (
                <IconButton marginTop='20px' disabled={isFinished || isDepositFinished} onClick={onPresentDeposit}
                style={{
                  'borderRadius': '5px',
                  'height': '46px',
                  'width': '110px',
                  'color': 'white'
                }}>
                  <FaFire color="white" /> Enter
                </IconButton>)}
              </>
            ))}

<div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', marginLeft:'15px', marginRight: '30px' }}>
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
                'height': '46px',
                'width': '110px',
                'color': 'white'
              }}
            >
              {TranslateString(9929, 'Settle')}
            </Button>
          )}
        </div>
        </StyledCardActions>
        {/* <StyledDetails>
          <div style={{ flex: 1 }}>{TranslateString(736, 'APY')}:</div>
          {isFinished || isOldSyrup || !apy || apy?.isNaN() || !apy?.isFinite() ? (
            '-'
          ) : (
            <Balance fontSize="14px" isDisabled={isFinished} value={apy?.toNumber()} decimals={2} unit="%" />
          )}
        </StyledDetails> */}

        


      </div>
{/*
      <CardFooter
        tokenName={tokenName}
        projectLink={projectLink}
        totalStaked={totalStaked}
        blocksRemaining={blocksRemaining}
        isFinished={isFinished}
        blocksUntilStart={blocksUntilStart}
        poolCategory={poolCategory}
        tokenPoolAddress={tokenPoolAddress}
        quoteTokenPoolAddress={quoteTokenPoolAddress}
/> */}
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
