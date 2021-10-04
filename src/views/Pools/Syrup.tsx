import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Heading, LinkExternal } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { useFarms, usePriceBnbBusd, usePools } from 'state/hooks'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { FaQuestionCircle , FaUserCheck, FaLock, FaHistory, FaExchangeAlt } from 'react-icons/fa'
import Coming from './components/Coming'
import PoolCard from './components/PoolCard'
import PoolTabButtons from './components/PoolTabButtons'
import Hero2 from './components/Hero'

const Title = styled.p`
  font-size: 1.1em;
  margin-bottom: 40px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  color: #2E2E2E;

`
const Sub = styled.p`
  font-size: 1em;
  color: #6E4EED;
`

const Feature = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  margin: 19px;
  font-size: 1.1em !important;
  max-width: 180px;
  text-align: center;


  @media screen and (max-width: 680px){
    max-width: 64%;
    flex-flow: row;
    align-items: flex-start;
    & > svg{
      width: 42px;
    }
    & > p{
      text-align: left;
      margin-left: 15px;
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


const Blablabla = styled.div`
  text-color: red;
  margin: 0px 18px;
  margin-bottom: 50px;
`
const GuideLink = styled.span`
  color: #0073ff;
`
const Divider = styled.div`
background-color: #4c68ef;
height: 3px;
margin-left: auto;
margin-right: auto;
margin-top: 25px;
margin-bottom: 25px;
width: 20%;

`

const SvgHero = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  padding: 42px 12px;

  @media all and (max-width: 1350px) { 
    max-width: 100%;
  }
`

const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const { account } = useWallet()
  const farms = useFarms()
  const pools = usePools(account)
  const bnbPriceUSD = usePriceBnbBusd()
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
    const isBnbPool = pool.poolCategory === PoolCategory.BINANCE
    const rewardTokenFarm = farms.find((f) => f.tokenSymbol === pool.tokenName)
    const stakingTokenFarm = farms.find((s) => s.tokenSymbol === pool.stakingTokenName)

    // /!\ Assume that the farm quote price is BNB
    const stakingTokenPriceInBNB = isBnbPool ? new BigNumber(1) : new BigNumber(stakingTokenFarm?.tokenPriceVsQuote)
    const rewardTokenPriceInBNB = priceToBnb(
      pool.tokenName,
      rewardTokenFarm?.tokenPriceVsQuote,
      rewardTokenFarm?.quoteTokenSymbol,
    )

    const totalRewardPricePerYear = rewardTokenPriceInBNB.times(pool.tokenPerBlock).times(BLOCKS_PER_YEAR)
    const totalStakingTokenInPool = stakingTokenPriceInBNB.times(getBalanceNumber(pool.totalStaked))
    const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)

    return {
      ...pool,
      isFinished: pool.sousId === 0 ? false : pool.isFinished || block > pool.endBlock,
      apy,
    }
  })

  const [finishedPools, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)

  return (
    <Page>
      <SvgHero>
        <object type="image/svg+xml" data="images/incubator.svg" width="600x">&nbsp;</object>
      </SvgHero>
      <Divider />
      <ActionsWrapper>
        <Blablabla >
          <FaQuestionCircle/> Learn how to earn with the Incubator <a target="_blanK" rel="noreferrer" href="https://artemis-protocol.gitbook.io/artemis/"><GuideLink>here</GuideLink></a>
        </Blablabla>
        </ActionsWrapper>

      <FlexLayout>
        <Route exact path={`${path}`}>
          <>
            {orderBy(openPools, ['sortOrder']).map((pool) => (
              <PoolCard key={pool.sousId} pool={pool} />
            ))}
            <Coming />
          </>
        </Route>
        <Route path={`${path}/history`}>
          {orderBy(finishedPools, ['sortOrder']).map((pool) => (
            <PoolCard key={pool.sousId} pool={pool} />
          ))}
        </Route>
      </FlexLayout>

      <FlexLayout>
          <Feature >
            <FaExchangeAlt /><br />

            <LinkExternal href='https://app.defikingdoms.com/#/swap'>Defi Kingdoms</LinkExternal>
            <LinkExternal href='https://viperswap.one/#/swap'>Viperswap</LinkExternal>

          </Feature>
      </FlexLayout>
          
    </Page>
  )
}

const Hero = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  padding-bottom: 33px;
`

export default Farm
