import React from 'react'
import { Route, useRouteMatch, Link } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ButtonMenu, ButtonMenuItem, Heading, LinkExternal } from '@pancakeswap-libs/uikit'
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
  usePriceTranq,
  lookupPrice,
} from 'state/hooks'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import Dashboard from 'views/Dashboard'
import { FaQuestionCircle , FaUserCheck, FaLock, FaHistory, FaExchangeAlt, FaWater, FaProjectDiagram } from 'react-icons/fa'
import Coming from './components/Coming'
import PoolCard from './components/PoolCard'
import PoolTabButtons from './components/PoolTabButtons'
import Hero2 from './components/Hero'

const StyledButton = styled.div`
  -webkit-box-align: center;
  align-items: center;
  background-image: linear-gradient(#2F324A, #2F324A);
  background: #2F324A;
  border-radius: 15px;
  border:1px solid #CECECE;
  border-color: #ffff !important;
  border-radius: 10px;
  color: #FFFF;
  font-size: 13px;
  font-weight: 300;
  display: inline-flex;
  height: 11px;
  width: 70px;
  padding: 14px;
  box-shadow: 0px 0px 2px #ccc;
  text-shadow: 0px 0px 0px #ccc;

  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    color: #ffff;
    outline: 0;
    border-color: #FFFF;
    box-shadow: 0px 0px 6px #cccc;
  }
`

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
  @media all and (max-width: 480px) {
      flex-flow: column;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin-bottom: 25px;
`

const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const farms = useFarms()
  const pools = usePools(account)
  const bnbPriceUSD = usePriceBnbBusd()
  const prices = usePrices()
  const priceTranq = usePriceTranq()
  const block = useBlock()

  const priceToBnb = (tokenName: string, tokenPrice: BigNumber, quoteToken: QuoteToken): BigNumber => {
    const tokenPriceBN = new BigNumber(tokenPrice)
    if (tokenName === 'BNB') {
      return new BigNumber(1)
    }
    if (tokenPrice && quoteToken === QuoteToken.BUSD) {
      return tokenPriceBN.div(bnbPriceUSD)
    }
    return tokenPriceBN
  }

  const poolsWithApy = pools.map((pool) => {
    let quoteTokens = new BigNumber(pool.quoteTokenPerLp).times(pool.totalStaked).div(new BigNumber(10).pow(18))
    if (pool.sousId === 4) {
        // Handle single staking pools
        quoteTokens = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18)).div(2)
    }
     if (pool.sousId === 8) {
      // Handle single staking pools
      quoteTokens = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18)).div(2)
    } 
    if (pool.sousId === 12) {
      // Handle single staking pools
      quoteTokens = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18)).div(2)
    } 
    if (pool.sousId === 14) {
      // Handle single staking pools
      quoteTokens = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18)).div(2)
    }
    if (pool.sousId === 15) {
      // Handle single staking pools
      quoteTokens = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18)).div(2)
    }
    if (pool.sousId === 16) {
      // Handle single staking pools
      quoteTokens = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18)).div(2)
    }
    
    console.log(quoteTokens)

    const tvl = getTotalValueFromQuoteTokens(quoteTokens, pool.quoteTokenSymbol, prices)
    // console.log("APY", pool, tvl && tvl.toNumber())
    const rewardTokenPrice = lookupPrice(pool.tokenName, prices)
    // console.log("price", pool.tokenName, rewardTokenPrice && rewardTokenPrice.toNumber())
    const totalRewardPricePerYear = rewardTokenPrice.times(pool.tokenPerBlock).times(BLOCKS_PER_YEAR)
    // const totalStakingTokenInPool = stakingTokenPriceInBNB.times(getBalanceNumber(pool.totalStaked))
    const apy = totalRewardPricePerYear.div(tvl).times(100)
    // console.log("TVL", pool.stakingTokenName, tvl && tvl.toNumber(), apy && apy.toNumber())

    return {
      ...pool,
      isFinished: pool.sousId === 0 ? false : pool.isFinished || block > pool.endBlock,
      apy,
      tvl
    }
  })

  const [finishedPools, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()

  return (
    <Page>

      <Dashboard/>

      <FlexLayout>
        <Route exact path={`${path}`}>
          <>
          {orderBy(openPools, ['sortOrder']).map((pool) => (
            <PoolCard key={pool.sousId} pool={pool} />))}
            {/* <Coming /> */ }
          </>
        </Route>

        <Route path={`${path}/history`}>
          {orderBy(finishedPools, ['sortOrder']).map((pool) => (
            <PoolCard key={pool.sousId} pool={pool}/>))}
        </Route>
      </FlexLayout>

      <Wrapper>
        <ActionsWrapper style={{ marginTop: '0px', alignItems:'center'}}>
          <ButtonMenu activeIndex={isExact ? 0 : 1} size="sm">
            <StyledButton style={{justifyContent:'center'}} as={Link} to={`${url}`}>
              {TranslateString(6198, 'Active')}
            </StyledButton>
            <StyledButton style={{justifyContent:'center', marginLeft:'5px'}} as={Link} to={`${url}/history`}>
              {TranslateString(7010, 'Inactive')}
            </StyledButton>
          </ButtonMenu>
        </ActionsWrapper>
      </Wrapper>

    </Page>
  )
}

export default Farm
