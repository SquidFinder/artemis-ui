import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, useModal, Flex, Link } from '@pancakeswap-libs/uikit'
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
import { FaLongArrowAltRight, FaMinus, FaPlus } from 'react-icons/fa'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'


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

const SvgHero = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap

  @media and all (max-width: 100px) {
    max-width: 50%;
  }
  
`

const StyledPlusMinusBTN = styled.button`
  align-items: center;
  display: inline-flex;
  border: 1px solid #555977;
  background-image: linear-gradient(#555977, #2F324A);
  border-radius: 10px;
  height: 37px;
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

const Bal = styled.div`
  font-size: 10px;
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  margin-top: 3px;
  justify-content: flex-end;
`

const StyledClaimBTN = styled.button`
  align-items: center;
  background-image: linear-gradient(#2F324A, #2F324A);
  border:1px solid #CECECE;
  border-color: #FFFF;
  border-radius: 10px;
  color: #FFFF;
  font-size: 13px;
  font-weight: 300;
  display: inline-flex;
  height: 11px;
  width: 80px;
  padding: 17px;
  box-shadow: 0px 0px 0px #ccc;
  text-shadow: 0px 0px 10px #ccc;
  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    outline: 0;
    border-color: #FFFF;
    cursor: pointer;
    box-shadow: 0px 0px 5px #fff;
  }
`

const EnableBTN = styled.button`
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
  margin-top: 35px;
  margin-bottom: 25px;
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

const StakedBalance = styled.text`
  font-size: 13px;
  align-items: center;
  color: #8E8E8E;
  display: flex;
  margin-top: 3px;
  justify-content: flex-start;
`

const IncubatorCard = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  align-self: baseline;
  background-image: linear-gradient(#2F324A, #33364D);
  border-radius: 20px;
  border: 2px solid #CECECE;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 25px;
  position: relative;
  text-align: center;
  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    outline: 0;
    border-color: #FFFF;
    box-shadow: 0px 0px 3px #cccc;
  }
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
  const isBnbPool = poolCategory === PoolCategory.BINANCE
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

  // Frontend Calculations
  const daysRemaining = Math.ceil((endBlock - block)*2*0.000277778*0.0416667);
  const APR = apy && apy.toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 });
  const TVL = pool.tvl && pool.tvl.toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 });
  const staked = getBalanceNumber(stakedBalance).toLocaleString('en-us', { maximumFractionDigits: 4, minimumFractionDigits: 4 });
  const earned = getBalanceNumber(earnings, tokenDecimals).toLocaleString('en-us', { maximumFractionDigits: 4, minimumFractionDigits: 4 });
  const profit = new BigNumber(apy).div(365).times(daysRemaining).toNumber().toLocaleString('en-us',{ maximumFractionDigits: 1 });

  return (
    <IncubatorCard isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
      <div>
        <SvgHero>
          <object 
            type="image/svg+xml" 
            data={`/images/incubator/${earnToken}.svg`}
            className="labhero"
            style={{  flexWrap:'wrap', maxWidth:'240px', justifyContent:'center'}}>&nbsp;</object>
        </SvgHero>

        <Flex justifyContent='space-between' marginTop='5px'>
          <LightText>tAPR</LightText>
          <Quote>{APR}%</Quote>
        </Flex>

        <Flex justifyContent='space-between'>
          <LightText>Ends In</LightText>
          <Quote>{daysRemaining} Days</Quote>
        </Flex>

        <Flex justifyContent='space-between'>
          <LightText>Value Locked</LightText>
          <Quote>${TVL}</Quote>
        </Flex>

        <Link href={projectLink} style={{'color':'white'}} target="_blank" >
          <Quote> About The Project <FaLongArrowAltRight/></Quote>
        </Link>

        {!account && <UnlockButton/>}
        {account && (needsApproval && !isOldSyrup ? (

        <div>
          <EnableBTN
            style={{justifyContent:"center"}} 
            disabled={isFinished || requestedApproval} 
            onClick={handleApprove}>Enable {stakingTokenName}
          </EnableBTN>
        </div>
        
        ) : ( <>

        <Flex justifyContent='space-between' marginTop='15px'>
          <div>
            <Bal>{earned}</Bal>
            <StakedBalance>Earned</StakedBalance>
          </div>
          <div>
            {account && harvest && !isOldSyrup && (
            <StyledClaimBTN
              style={{justifyContent:"center"}}
              disabled={!earnings.toNumber() || pendingTx}
              onClick={async () => {
                setPendingTx(true)
                await onReward()
                setPendingTx(false)}}>
              Claim
            </StyledClaimBTN>)}
          </div>
        </Flex>

        <Flex justifyContent='space-between' marginTop='6px'>

          <div>
            <Bal>{staked}</Bal>
            <StakedBalance>{stakingTokenName}</StakedBalance>
          </div>

          <div>
            <StyledPlusMinusBTN 
              style={{justifyContent:"center"}}
              disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
              onClick={ isOldSyrup ? async () => {
                setPendingTx(true)
                await onUnstake('0')
                setPendingTx(false)} : onPresentWithdraw}>
              <FaMinus/>
            </StyledPlusMinusBTN>

            {!isOldSyrup && (
            <StyledPlusMinusBTN
              style={{justifyContent:"center", marginLeft:'5px'}}  
              disabled={isFinished && sousId !== 0} 
              onClick={onPresentDeposit}>
              <FaPlus/>
            </StyledPlusMinusBTN>)}   
          </div>

        </Flex>

        </> ))}

      </div>
    </IncubatorCard>
  )
}

export default PoolCard
