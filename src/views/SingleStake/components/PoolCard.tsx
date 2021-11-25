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
  text-shadow: 0px 0px 10px #ccc;
`

const Quote2 = styled.p`
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 6px;
  text-shadow: 0px 0px 0px #ccc;
  color: #8E8E8E;
  margin-left: 5px;
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

const StyledStake = styled.button`
  align-items: center;
  display: inline-flex;
  background-image: linear-gradient(#555977, #2F324A);
  border: 1px solid;
  border-color: #555977;
  border-radius: 10px;
  color: #FFFF;
  font-size: 13px;
  font-weight: 300;
  height: 42px;
  width: 110px;
  padding: 15px;

  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    outline: 0;
    border-color: #FFFF;
    cursor: pointer;
    box-shadow: 0px 0px 0px #fff;
    text-shadow: 0px 0px 10px #fff;
  }
`

const StyledUnstake = styled.button`
  align-items: center;
  background-image: linear-gradient(#2F324A, #2F324A);
  border:1px solid #CECECE;
  border-color: #FFFF;
  border-radius: 10px;
  color: #FFFF;
  font-size: 13px;
  font-weight: 300;
  display: inline-flex;
  height: 42px;
  width: 80px;
  padding: 15px;

  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    outline: 0;
    border-color: #FFFF;
    cursor: pointer;
    box-shadow: 0px 0px 0px #fff;
    text-shadow: 0px 0px 10px #fff;
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
  margin-top: 0px;  
  margin-bottom: 0px;
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

const StakeCard = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
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

const Divider = styled.div`
  background-color: #FFFF;
  margin-bottom: 15px;
  margin-top: 7px;
  width: 100%;
  height: 1px;
  box-shadow: 0px 0px 3px #ffff;
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
  const APY = apy && apy.toNumber().toLocaleString('en-us', { maximumFractionDigits: 0, minimumFractionDigits: 0 })
  const APR = apr && apr.toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 });
  const WeeklyROI = apr && apr.div(52).times(7).toNumber().toLocaleString('en-us', { maximumFractionDigits: 1, minimumFractionDigits: 1 })
  const StakedUSDBalance = getBalanceNumber(stakedBalanceUsd).toLocaleString('en-us', { maximumFractionDigits: 1, minimumFractionDigits: 1 })
  const StakedBalance = getBalanceNumber(stakedBalance).toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  const ExpectedBalanceMonth = apr.div(12).times(getBalanceNumber(stakedBalanceUsd)).times(0.01).plus(getBalanceNumber(stakedBalanceUsd)).toNumber().toLocaleString('en-us', { maximumFractionDigits: 1, minimumFractionDigits: 1 });

  return (
    <StakeCard isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
      <div>
        <div>
          <Flex justifyContent='left' marginBottom='20px'>
            <object type="image/svg+xml" data='/images/core/logo2.svg' width="30px">&nbsp;</object> 
            <StakeTitle>MIS Staking</StakeTitle>
          </Flex>
        </div>

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

        <Divider/>

        <Flex justifyContent='space-between'>
          <Quote>Your Staked MIS</Quote>
          <Quote>{StakedBalance}</Quote>
        </Flex>

        <Flex justifyContent='space-between'>
          <Quote2>USD Balance</Quote2>
          <Quote2>${StakedUSDBalance}</Quote2>
        </Flex>
        
        <Flex justifyContent='space-between'>
          <Quote2>Expected Balance (Month)</Quote2>
          <Quote2>${ExpectedBalanceMonth}</Quote2>
        </Flex>

        <Flex style={{ justifyContent:"center", marginTop: '20px', marginBottom: '10px'}}>
          {!account && <UnlockButton />}
          {account && (needsApproval && !isOldSyrup ? (

          <div>
            <EnableBTN
              style={{ justifyContent:"center"}}
              disabled={isFinished || requestedApproval}
              onClick={handleApprove}>
              Enable MIS
            </EnableBTN>
          </div>

          ) : ( <>

          <div>
            <StyledUnstake 
              style={{ justifyContent:"center", marginTop: '20px', marginRight:'10px' }}
              disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
              onClick={ isOldSyrup ? async () => {
                setPendingTx(true)
                await onUnstake('0')
                setPendingTx(false)} : onPresentWithdraw }>
              Unstake
            </StyledUnstake>
            
            {!isOldSyrup && (
            <StyledStake
              style={{ justifyContent:"center" }}
              disabled={isFinished && sousId !== 0} 
              onClick={onPresentDeposit}>
              Stake
            </StyledStake>)}
          </div> 

          </> ))}

        </Flex>
      </div>
    </StakeCard>
  )
}

export default PoolCard
