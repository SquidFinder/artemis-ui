import BigNumber from 'bignumber.js'
import {useEffect} from 'react'
import labo from 'config/constants/labo'
import {useDispatch, useSelector} from 'react-redux'
import useRefresh from 'hooks/useRefresh'
import {
  fetchFarmsPublicDataAsync,
  fetchPoolsPublicDataAsync,
  fetchPools2PublicDataAsync,
  fetchPoolsUserDataAsync,
  fetchPools2UserDataAsync
} from './actions'
import {Farm, Pool, Pool2, State, State2} from './types'
import {QuoteToken} from '../config/constants/types'

const ZERO = new BigNumber(0)
const TEN_POW_18 = new BigNumber(10).pow(18)

export const useFetchPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync())
    dispatch(fetchPools2PublicDataAsync())
  }, [dispatch, slowRefresh])
}

// Farms

export const useFarms = (): Farm[] => {
  const farms = useSelector((state: State) => state.farms.data)
  return farms
}

export const usePoolsPublic = (): Pool[] => {
  const pools = useSelector((state: State) => state.pools.data)
  return pools
}

export const usePoolsPublic2 = (): Pool2[] => {
  const pools2 = useSelector((state: State) => state.pools2.data)
  return pools2
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
  const prices = usePrices()
  const quoteTokenAmount = new BigNumber(farm.quoteTokenPerLp).times(farmTokens)
  return getTotalValueFromQuoteTokens(quoteTokenAmount, farm.quoteTokenSymbol, prices)
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

export const usePools2 = (account): Pool2[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPools2UserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const pools2 = useSelector((state: State) => state.pools2.data)
  return pools2
}

export const usePool2FromPid = (sousId): Pool2 => {
  const pool2 = useSelector((state: State) => state.pools2.data.find((p) => p.sousId === sousId))
  return pool2
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

export const usePriceMagic = (): BigNumber => {
  const priceMis = usePriceCakeBusd();
  const pool = usePoolFromPid(3)
  return new BigNumber(priceMis).times(pool.tokenPriceVsQuote);
}

export const usePriceFox = (): BigNumber => {
  const priceMis = usePriceCakeBusd();
  const pool = usePoolFromPid(11)
  return new BigNumber(priceMis).times(pool.tokenPriceVsQuote);
}

export const usePriceLblox = (): BigNumber => {
  const priceMis = usePriceCakeBusd();
  const pool = usePoolFromPid(5)
  return new BigNumber(priceMis).times(pool.tokenPriceVsQuote);
}

export const usePriceBoss = (): BigNumber => {
  const priceMis = usePriceCakeBusd();
  const pool = usePoolFromPid(13)
  return new BigNumber(priceMis).times(pool.tokenPriceVsQuote);
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

export const usePriceTranq = (): BigNumber => {
  const priceMis = usePriceCakeBusd();
  const farm = useFarmFromPid(1);
  // dispatch(fetchLaboPriceAsync());
  // const price = useSelector((state: State) => state.farms.price)
  // if (!labo.fetch.fetchAutomatic){
  //   return ( !labo.fetch.fetchPriceCustom ? new BigNumber(farm.tokenPriceVsQuote) : new BigNumber(price))
  // }

  // return ( !( price ? price.isFinite : false ) ? new BigNumber(farm.tokenPriceVsQuote) : new BigNumber(price))
  return new BigNumber(priceMis).times(farm.tokenPriceVsQuote);
}


export const usePriceXya = (): BigNumber => {
  const priceMis = usePriceCakeBusd();
  const pool = usePoolFromPid(2)
  return new BigNumber(priceMis).times(pool.tokenPriceVsQuote);
}

export const usePriceTroll = (): BigNumber => {
  const priceMis = usePriceCakeBusd();
  const pool = usePoolFromPid(7)
  return new BigNumber(priceMis).times(pool.tokenPriceVsQuote);
}

export const usePriceSonic = (): BigNumber => {
  const priceMis = usePriceCakeBusd();
  const pool = usePoolFromPid(10)
  return new BigNumber(priceMis).times(pool.tokenPriceVsQuote);
}

export const usePriceLuna = (): BigNumber => {
  const pid = 9 // BUSD-BNB LP
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
} 

export const usePriceRvrs = (): BigNumber => {
  const pid = 11 // BUSD-BNB LP
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
} 

export const usePriceTranqb = (): BigNumber => {
  const priceMis = usePriceCakeBusd();
  const pool = usePool2FromPid(1)
  // console.log('usePriceTranqb', pool)
  return new BigNumber(priceMis).times(pool.tokenPriceVsQuote);
}

export const usePriceCakeBusd = (): BigNumber => {
  // const pid = 1 // CAKE-BNB LP
  // const bnbPriceUSD = usePriceBnbBusd()
  // const farm = useFarmFromPid(pid)
  // return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
  // const dispatch = useDispatch()
  const pid = labo.pids.pidLaboUst; // EGG-BUSD LP
  const farm = useFarmFromPid(pid);
  // dispatch(fetchLaboPriceAsync());
  // const price = useSelector((state: State) => state.farms.price)
  // if (!labo.fetch.fetchAutomatic){
  //   return ( !labo.fetch.fetchPriceCustom ? new BigNumber(farm.tokenPriceVsQuote) : new BigNumber(price))
  // }

  // return ( !( price ? price.isFinite : false ) ? new BigNumber(farm.tokenPriceVsQuote) : new BigNumber(price))
  return new BigNumber(farm.tokenPriceVsQuote);
}

export const usePrices = () => {
  const misPrice = usePriceCakeBusd()
  const onePrice = usePriceBnbBusd()
  const tranqPrice = usePriceTranq()
  const xyaPrice = usePriceXya()
  const magicPrice = usePriceMagic()
  const wonePrice = usePriceBnbBusd()
  const lbloxPrice = usePriceLblox()
  const trollPrice = usePriceTroll()
  const lunaPrice = usePriceLuna()
  const tranqbPrice = usePriceTranqb()
  const sonicPrice = usePriceSonic()
  const foxPrice = usePriceFox()
  const bossPrice = usePriceBoss()
  const rvrsPrice = usePriceRvrs()

  return [
      {name: QuoteToken.MIS, price: misPrice},
      {name: QuoteToken.CAKE, price: misPrice},
      {name: QuoteToken.ONE, price: onePrice},
      {name: QuoteToken.TRANQ, price: tranqPrice},
      {name: QuoteToken.XYA, price: xyaPrice},
      {name: QuoteToken.MAGIC, price: magicPrice},
      {name: QuoteToken.WONE, price: wonePrice},
      {name: QuoteToken.LBLOX, price: lbloxPrice},
      {name: QuoteToken.TROLL, price: trollPrice},
      {name: QuoteToken.LUNA, price: lunaPrice},
      {name: QuoteToken.TRANQB, price: tranqbPrice},
      {name: QuoteToken.SONIC, price: sonicPrice},
      {name: QuoteToken.FOX, price: foxPrice},
      {name: QuoteToken.BOSS, price: bossPrice},
      {name: QuoteToken.RVRS, price: rvrsPrice},
  ]
}

export const lookupPrice = (tokenName, prices) => {
  // lookup a specific price from usePrices output
  const tokenPrice = prices.find(f => f.name === tokenName)
  if (tokenPrice) {
    return tokenPrice.price
  }
  console.log("ERROR: No price found for", tokenName)
  return new BigNumber(0)
}


export const getTotalValueFromQuoteTokens = (quoteTokenAmount, quoteToken, prices) => {
  // WARNING: Needs to be updated for single-staking pools
  // First handle all stable-coins
  if (quoteToken === QuoteToken.UST || quoteToken === QuoteToken.BUSD) {
    return new BigNumber(2).times(quoteTokenAmount)
  }
  if (quoteToken === QuoteToken.ONE) {
    const price = lookupPrice(QuoteToken.ONE, prices)
    return new BigNumber(2).times(quoteTokenAmount).times(price)
  }
  if (quoteToken === QuoteToken.MIS) {
    const price = lookupPrice(QuoteToken.MIS, prices)
    return new BigNumber(2).times(quoteTokenAmount).times(price)
  }
  if (quoteToken === QuoteToken.FOX) {
    const price = lookupPrice(QuoteToken.FOX, prices)
    return new BigNumber(2).times(quoteTokenAmount).times(price)
  }
  if (quoteToken === QuoteToken.RVRS) {
    const price = lookupPrice(QuoteToken.RVRS, prices)
    return new BigNumber(2).times(quoteTokenAmount).times(price)
  }
  console.log("ERROR: NO PRICE FOUND FOR QuoteToken:", quoteToken)
  return new BigNumber(0)
}


export const useTotalValue = (): BigNumber => {
  const farms = useFarms();
  const prices = usePrices();
  const pools = usePoolsPublic()
  const pools2 = usePoolsPublic2()

  let value = new BigNumber(0);
  for (let i = 0; i < farms.length; i++) {
    const farm = farms[i]
    if (farm.lpTotalInQuoteToken) {
      let val = new BigNumber(0);
      val = getTotalValueFromQuoteTokens(farm.quoteTokenAmount, farm.quoteTokenSymbol, prices)
      // console.log("useTotalValue", farm.pid, val && val.toNumber(), farm)
      value = value.plus(val);
    }
  }
  
  // Do incubator pools
  for (let i = 0; i < pools.length; i++) {
    const pool = pools[i]

    const quoteTokens = new BigNumber(pool.quoteTokenPerLp).times(pool.totalStaked).div(new BigNumber(10).pow(18))
    const val = getTotalValueFromQuoteTokens(quoteTokens, pool.quoteTokenSymbol, prices)

    if (val) {
      // console.log("useTotalValue", farm.pid, val && val.toNumber(), farm)
      value = value.plus(val);
    }

  }

   // Do burn pools
  for (let i = 0; i < pools2.length; i++) {
    const pool2 = pools2[i]

    const quoteTokens = new BigNumber(pool2.quoteTokenPerLp).times(pool2.totalStaked).div(new BigNumber(10).pow(18))
    const val = getTotalValueFromQuoteTokens(quoteTokens.div(2), pool2.quoteTokenSymbol, prices)

    if (val && !pool2.isFinished) {
      // console.log("useTotalValue", farm.pid, val && val.toNumber(), farm)
      value = value.plus(val);
    }

  }

  return value;
}
