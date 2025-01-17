import React, { useState } from 'react'
import { Route, useRouteMatch, Link } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Alert, ButtonMenu, ButtonMenuItem, Heading, LinkExternal } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import {
  useFarms,
  usePriceBnbBusd,
  usePools2,
  usePrices,
  getTotalValueFromQuoteTokens,
  usePriceTranq,
  lookupPrice,
  usePriceTranqb
} from 'state/hooks'
import { QuoteToken, Pool2Category } from 'config/constants/types'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { FaQuestionCircle , FaUserCheck, FaLock, FaHistory, FaExchangeAlt, FaWater, FaProjectDiagram, FaFireAlt, FaBurn } from 'react-icons/fa'
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
  margin-top: 20px;
`
const GuideLink = styled.span`
  color: #0073ff;
`
const Divider = styled.div`
background-color: #2F324A;
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
  padding: 22px 1px;

  @media and all (max-width: 1000px) {
    max-width: 80%;
  }
  
`


const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const farms = useFarms()
  const pools2 = usePools2(account)
  const bnbPriceUSD = usePriceBnbBusd()
  const prices = usePrices()
  const priceTranq = usePriceTranqb()
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

  const poolsWithApy = pools2.map((pool2) => {

    let quoteTokens = new BigNumber(pool2.quoteTokenPerLp).times(pool2.totalStaked).div(new BigNumber(10).pow(18))
    if (pool2.sousId === 4 || pool2.tokenName === pool2.quoteTokenSymbol) {
        // Handle single staking pools
        quoteTokens = new BigNumber(pool2.totalStaked).div(new BigNumber(10).pow(18)).div(2)
    }
     if (pool2.sousId === 8 || pool2.tokenName === pool2.quoteTokenSymbol) {
      // Handle single staking pools
      quoteTokens = new BigNumber(pool2.totalStaked).div(new BigNumber(10).pow(18)).div(2)
    } 

    const tvl = getTotalValueFromQuoteTokens(quoteTokens, pool2.quoteTokenSymbol, prices)

    // console.log("APY", pool2, tvl && tvl.toNumber())
    const rewardTokenPrice = lookupPrice(pool2.tokenName, prices)
    // console.log("price", pool2.tokenName, rewardTokenPrice && rewardTokenPrice.toNumber())

    const totalRewardPricePerYear = rewardTokenPrice.times(pool2.tokenPerBlock).times(BLOCKS_PER_YEAR)
    // const totalStakingTokenInPool = stakingTokenPriceInBNB.times(getBalanceNumber(pool2.totalStaked))
    const apy = totalRewardPricePerYear.div(tvl).times(100)
    // console.log("TVL", pool2.stakingTokenName, tvl && tvl.toNumber(), apy && apy.toNumber())

    return {
      ...pool2,
      isFinished: pool2.sousId === 0 ? false : pool2.isFinished || block > pool2.endBlock,
      apy,
      tvl
    }
  })

  const [finishedPools, openPools] = partition(poolsWithApy, (pool2) => pool2.isFinished)
  const { url, isExact } = useRouteMatch()

  
  const [modalOpen, setModalOpen] = useState(true) 

  const handleModal = async () => {
    setModalOpen(!modalOpen)
  }  

  const TranslateString = useI18n()

  return (
    <Page>



      <FlexLayout>
        <Route exact path={`${path}`}>
          <>
            {orderBy(openPools, ['sortOrder']).map((pool2) => (
              <PoolCard key={pool2.sousId} pool2={pool2} />
            ))}
            
          </>
        </Route>
        <Route path={`${path}/history`}>
          {orderBy(finishedPools, ['sortOrder']).map((pool2) => (
            <PoolCard key={pool2.sousId} pool2={pool2} />
          ))}
        </Route>
      </FlexLayout>

          
    </Page>
  )
}

const Features = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 35px;
  @media screen and (max-width: 680px){
    flex-flow: column;
  }
`

const Hero = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  padding-bottom: 33px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin-bottom: 25px;
  
`

export default Farm


