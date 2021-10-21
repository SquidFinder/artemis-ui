import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import Pools from 'views/Pools'
import MoneyWheel from 'views/MoneyWheel2'
import GlobalStyle from './style/Global'
import NavBar from './components/NavBar'
import NftGlobalNotification from './views/Nft/components/NftGlobalNotification'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Pools2 = lazy(() => import('./views/Pools2'))
// const MoneyWheel = lazy(() => import('./views/MoneyWheel'))
// const MoneyWheel2 = lazy(() => import('./views/MoneyWheel2'))
const Lottery = lazy(() => import('./views/Lottery'))
// const Pools = lazy(() => import('./views/Pools'))
const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
// const Nft = lazy(() => import('./views/Nft'))

// This config is required for number formating
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
      <ResetCSS />
      <GlobalStyle />
      <NavBar>
        .
      </NavBar>
        <Suspense fallback>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            
            <Route path="/Elysium">
              <Farms />
            </Route>
            
            <Route path="/Incubator">
              <Pools />
            </Route>
            {/*
            <Route path="/pools">
              <Farms tokenMode/>
             </Route> 
        */}               
            <Route path="/Earn">
              <MoneyWheel />
            </Route>

            {/* <Route path="/onewheel">
              <MoneyWheel2 />
            </Route>
             <Route path="/nft">
              <Nft/>
            </Route> 
*/}
            <Route path="/Lottery">
              <Lottery />
            </Route> 

            <Route path="/hades">
            <Pools2 />
            </Route>
            <Route path="/ArtemisPad">
            <Ifos />
            </Route> 
                        {/* Redirect */}
            {/* <Route path="/nft">
            <Nft /> 
            </Route>  
          */ }
            <Route path="/launchpad">
            <Redirect to="/ArtemisPad" /> 
            </Route> 
        
           {/* <Route path="/syrup">
            <Redirect to="/pools" />
            </Route>
          */}
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      <NftGlobalNotification />
    </Router>
  )
}

export default React.memo(App)
