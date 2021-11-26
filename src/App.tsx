import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import GlobalStyle from './style/Global'
import NavBar from './components/NavBar'

const LiqPools = lazy(() => import('./views/LiqPools'))
const Incubator = lazy(() => import('./views/Incubator'))
const ArtemisPad = lazy(() => import('./views/ArtemisPad'))
const NotFound = lazy(() => import('./views/NotFound'))
const ComingSoon = lazy(() => import('./views/ComingSoon'))
const SingleStake = lazy(() => import('./views/SingleStake'))

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  useFetchPublicData()

  return (
    <Router>
      <ResetCSS/>
      <GlobalStyle/>
      <NavBar/>

      <Suspense fallback>
        <Switch>

          <Route path="/" exact>
            <LiqPools/>
          </Route>

          <Route path="/pools">
            <LiqPools/>
          </Route>
          
          { /*
          <Route path="/incubator">
            <Incubator/>
          </Route>


          <Route path="/artemispad">
            <ArtemisPad/>
          </Route>
          */ }

          <Route path="/stake">
            <SingleStake/>
          </Route> 
          
          <Route path="/comingsoon">
            <ComingSoon/>
          </Route> 

          <Route component={NotFound} />

        </Switch>
      </Suspense>
    </Router>
  )
}

export default React.memo(App)
