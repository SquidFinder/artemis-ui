import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { BLOCKS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import {
  useFarms,
  usePriceBnbBusd,
  usePools,
  usePrices,
  getTotalValueFromQuoteTokens,
  lookupPrice, useFarmFromPid, usePools3,
} from 'state/hooks'
import Page from 'components/layout/Page'
import FlexStaking from 'components/layout/FlexStaking'
import PoolCard from './components/PoolCard'

// APR to APY Calculation
export const aprToApy = (apr: number): BigNumber => {
   const apy = new BigNumber(apr).div(100).div(365).plus(1).pow(365).times(100);
  // const cmpd = 1000;
// const apy = new BigNumber(apr).div(100).div(cmpd).plus(1).pow(cmpd).minus(1).times(100
  return apy.isNaN() || !apy.isFinite() ? null : apy;
};

export const BIG_TEN = new BigNumber(10);


const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const farm0 = useFarmFromPid(1);
  const pools = usePools3(account)
  const prices = usePrices()
  const block = useBlock()

  const poolsWithApy = pools.map((pool) => {
    const quoteTokens = pool.totalStaked ?
        new BigNumber(pool.totalStaked.toString()).div(2).div(BIG_TEN.pow(18)) :
        new BigNumber(0)
    const tvl = getTotalValueFromQuoteTokens(quoteTokens, pool.quoteTokenSymbol, prices)
    const reverseAtlastUserAction = pool.userData ?
        new BigNumber(pool.userData.reverseAtlastUserAction) :
        new BigNumber(0)
    const lastDepositedTime = pool.userData ?
        new BigNumber(pool.userData.lastDepositedTime) :
        new BigNumber(0)
    const lastUserActionTime = pool.userData ?
        new BigNumber(pool.userData.lastUserActionTime) :
        new BigNumber(0)

    // console.log("APY", pool, tvl && tvl.toNumber())
    const rewardTokenPrice = lookupPrice(pool.tokenName, prices)
    // console.log("price", pool.tokenName, rewardTokenPrice && rewardTokenPrice.toNumber())
    const vikingPerBlock = 2000000000000000000
    const poolWeight = 0.01
    const totalRewardPricePerYear = rewardTokenPrice.times(vikingPerBlock).div(BIG_TEN.pow(18)).times(poolWeight).times(BLOCKS_PER_YEAR)
    // const totalStakingTokenInPool = stakingTokenPriceInBNB.times(getBalanceNumber(pool.totalStaked))
    const apr = totalRewardPricePerYear.div(tvl).times(100)
    const apy = aprToApy(apr)
    // console.log("TVL", pool.stakingTokenName, tvl && tvl.toNumber(), apy && apy.toNumber())
    console.log(farm0.vikingPerBlock, farm0.poolWeight)
    return {
      ...pool,
      isFinished: pool.sousId === 0 ? false : pool.isFinished || block > pool.endBlock,
      apr,
      apy,
      tvl,
      lastDepositedTime,
      lastUserActionTime,
      reverseAtlastUserAction
    }
  })

  const [finishedPools, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()
  console.log(poolsWithApy)

  return (
    <Page>
      <FlexStaking>
        <Route exact path={`${path}`}>
          <>
            {orderBy(openPools, ['sortOrder']).map((pool) => (
              <PoolCard key={pool.sousId} pool={pool}/>
            ))}
          </> 
        </Route>
      </FlexStaking>  
    </Page>
  )
}

export default Farm
