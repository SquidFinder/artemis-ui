import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import labo from 'config/constants/labo'
import { provider } from 'web3-core'
import { Image, Heading, Alert, LinkExternal } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import {getTotalValueFromQuoteTokens, useFarms, usePriceBnbBusd, usePriceCakeBusd, usePrices} from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import { FaUserCheck, FaLock, FaHistory } from 'react-icons/fa';
import useI18n from 'hooks/useI18n'
import Dashboard from 'views/Dashboard'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'


export interface FarmsProps{
  tokenMode?: boolean
}

const FarmsLayout = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 260px;
    max-width: 36%;
    width: 100%;
    margin: 0 7.5px;
    margin-bottom: 15px;
    margin-top: 15px;
  }
`

const FarmsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  max-width: 950px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    margin: 25px;
    margin-top: 10px;
  }
`

const FarmsPage = styled(FarmsContainer)`
    min-height: calc(100vh - 64px);
    padding-top: 16px;
    padding-bottom: 16px
    margin-left: auto;
    margin-right: auto;;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
    margin-left: auto;
    margin-right: auto;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 21px;
    padding-bottom: 32px;
    margin-left: auto;
    margin-right: auto;
  }
`

const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const farms = useFarms();
  const prices = usePrices()
  const farmsLP = useFarms()
  const cakePrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const {tokenMode} = farmsProps;
  const [modalOpen, setModalOpen] = useState(true) 
  const handleModal = async () => {
    setModalOpen(!modalOpen)
  }  
  // if (process.env.REACT_APP_DEBUG === "true") console.log(cakePrice, "testingg cakePrice");

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)

  const activeFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier === '0X' && farm.pid === 12)

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )
  let vikingPerBlock = 0;
  if (process.env.REACT_APP_DEBUG === "true"){ console.log(farms[0], 'testing viking per block') }
  if(farms && farms[0] && farms[0].vikingPerBlock){
    vikingPerBlock = new BigNumber(farms[0].vikingPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }
  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      // const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
        //   return farm
        // }

        const cakeRewardPerBlock = new BigNumber(farm.vikingPerBlock || 1).times(new BigNumber(farm.poolWeight)) .div(new BigNumber(10).pow(18))
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)
        let apy = new BigNumber(cakePrice).times(cakeRewardPerYear);
        const totalValue = getTotalValueFromQuoteTokens(farm.quoteTokenAmount, farm.quoteTokenSymbol, prices);

        if(totalValue.comparedTo(0) > 0){
          apy = apy.div(totalValue);
        }

        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          removed={removed}
          bnbPrice={bnbPrice}
          cakePrice={cakePrice}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [prices, cakePrice, bnbPrice, account, ethereum],
  )

  return (
    <FarmsPage>
      <Dashboard/>
      <div>
        <FarmsLayout>
          <Route exact path={`${path}`}>
            {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(activeFarms, false)}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsList(inactiveFarms, true)}
          </Route>
        </FarmsLayout>
        <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly} tokenMode={tokenMode}/>
      </div>
    </FarmsPage>
  )
}


export default Farms
