import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    tokenName: 'TRANQ',
    stakingTokenName: QuoteToken.MISTRANQ,
    stakingTokenAddress: '0xfA45e64Adf9BF3caDC65b737b2B0151C750f414C',
    // this is MIS
    tokenPoolAddress: '0xd74433b187cf0ba998ad9be3486b929c76815215',
    // this is TRANQ
    quoteTokenPoolAddress: '0xcf1709ad76a79d5a60210f23e81ce2460542a836',
    contractAddress: {
      1666700000: '0xC2B1FC77e49BE0a99520EAd73da3a76AF533482D',
      1666600000: '0xC2B1FC77e49BE0a99520EAd73da3a76AF533482D',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://www.tranquil.finance/',
    harvest: true,
    tokenPerBlock: '0.22',
    sortOrder: 1,
    isFinished: false,
    startBlock: 17996500,
    endBlock: 18903700,
    tokenDecimals: 18,
   },
  // {
  //   sousId: 1,
  //   tokenName: 'TWT',
  //   stakingTokenName: QuoteToken.SYRUP,
  //   stakingTokenAddress: '0x009cF7bC57584b7998236eff51b98A168DceA9B0',
  //   contractAddress: {
  //     1666700000: '0xAfd61Dc94f11A70Ae110dC0E0F2061Af166660000033061A',
  //     1666600000: '0xAfd61Dc94f11A70Ae110dC0E0F2061Af166660000033061A',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   projectLink: 'https://trustwallet.com/',
  //   harvest: true,
  //   tokenPerBlock: '20',
  //   sortOrder: 999,
  //   isFinished: true,
  //   tokenDecimals: 18,
  // },
]

export default pools
