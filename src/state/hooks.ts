import BigNumber from 'bignumber.js'
import { useEffect, useMemo } from 'react'
import labo  from 'config/constants/labo'
import { useQuery, gql } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmsPublicDataAsync, fetchPoolsPublicDataAsync, fetchPoolsUserDataAsync, fetchLaboPriceAsync } from './actions'
import { State, Farm, Pool } from './types'
import { QuoteToken } from '../config/constants/types'

const ZERO = new BigNumber(0)
const TEN_POW_18 = new BigNumber(10).pow(18)

export const useFetchPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
    // dispatch(fetchPoolsPublicDataAsync())
  }, [dispatch, slowRefresh])
}

// Farms

export const useFarms = (): Farm[] => {
  const farms = useSelector((state: State) => state.farms.data)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}


export const useFarmTokensToUsd = (pid, farmTokens) => {
  // farmTokens is the # of LP tokens, or just the number of tokens for single staking pools
  // All price logic should go here for farms
  const farm = useFarmFromPid(pid)
  const onePrice = usePriceBnbBusd()
  const misPrice = usePriceCakeBusd()

  if (pid === 2) {
    // MIS Pool
    return new BigNumber(misPrice).times(farmTokens).div(TEN_POW_18)
  }
  if (pid === 0 || pid === 3) {
    // These all have quote symbol as a stablecoin
    return new BigNumber(2).times(farm.quoteTokenPerLp).times(farmTokens).div(TEN_POW_18)
  }
  if (pid === 1 || pid === 4) {
    // One as quote token
    return new BigNumber(2).times(onePrice).times(farm.quoteTokenPerLp).times(farmTokens).div(TEN_POW_18)
  }
  if (pid === 2) {
    // This is MIS Single staking
    return  (misPrice).times(farmTokens).div(TEN_POW_18)
  }

  console.log("No price found for pid = ", pid)
  return new BigNumber(0)
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
  }
}


// Pools

export const usePools = (account): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const pools = useSelector((state: State) => state.pools.data)
  return pools
}

export const usePoolFromPid = (sousId): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
  return pool
}

// Prices

export const usePriceBnbBusd = (): BigNumber => {
  const pid = labo.pids.pidBnbBusd // BUSD-BNB LP
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

// export const fetchLaboPrice = (): BigNumber => {
//   const query = `
//   {ethereum(network: bsc){
//     address(address: {is: "0xbf9a298a948079bed1e0902e78c61b1b30f58e7e"}){
//     balances {
//     currency {
//     symbol
//     }
//     value
//     }}
//     }}
// `;
// const url = "https://graphql.bitquery.io/";
// const opts = {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         query
//     })
// };

// fetch(url, opts)
//   .then(response => response.json())
//   .then(json => {
//     if (process.env.REACT_APP_DEBUG === "true") console.log(json.data.ethereum.address[0].balances);
//   })
//   .catch(console.error);

//   return new BigNumber(3);
// }

export const usePriceCakeBusd = (): BigNumber => {
  // const pid = 1 // CAKE-BNB LP
  // const bnbPriceUSD = usePriceBnbBusd()
  // const farm = useFarmFromPid(pid)
  // return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
  // const dispatch = useDispatch()
  const pid = labo.pids.pidLaboBusd; // EGG-BUSD LP
  const farm = useFarmFromPid(pid);
  // dispatch(fetchLaboPriceAsync());
  // const price = useSelector((state: State) => state.farms.price)
  // if (!labo.fetch.fetchAutomatic){
  //   return ( !labo.fetch.fetchPriceCustom ? new BigNumber(farm.tokenPriceVsQuote) : new BigNumber(price))
  // }

  // return ( !( price ? price.isFinite : false ) ? new BigNumber(farm.tokenPriceVsQuote) : new BigNumber(price))
  return new BigNumber(farm.tokenPriceVsQuote);
}

export const useTotalValue = (): BigNumber => {
  const farms = useFarms();
  const bnbPrice = usePriceBnbBusd();
  const cakePrice = usePriceCakeBusd();
  let value = new BigNumber(0);
  for (let i = 0; i < farms.length; i++) {
    const farm = farms[i]
    if (farm.lpTotalInQuoteToken) {
      let val = new BigNumber(0);
      if (farm.pid === 0 || farm.pid === 3) {
        // These all have quote symbol as a stablecoin
        val = new BigNumber(2).times(farm.quoteTokenAmount)
      }
      if (farm.pid === 1 || farm.pid === 4) {
        // One as quote token
        val = new BigNumber(2).times(bnbPrice).times(farm.quoteTokenAmount)
      }
      // console.log("TVL", farm.pid, val && val.toNumber())
      value = value.plus(val);

    }
  }
  return value;
}