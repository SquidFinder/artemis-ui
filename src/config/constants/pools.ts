import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 1,
    tokenName: 'TRANQ',
    quoteTokenSymbol: QuoteToken.MIS,
    stakingTokenName: QuoteToken.MISTRANQ,
    stakingTokenAddress: '0xfA45e64Adf9BF3caDC65b737b2B0151C750f414C',
    // this is MIS
    quoteTokenPoolAddress: '0xd74433b187cf0ba998ad9be3486b929c76815215',
    // this is TRANQ
    tokenPoolAddress: '0xcf1709ad76a79d5a60210f23e81ce2460542a836',
    contractAddress: {
      1666700000: '0xC2B1FC77e49BE0a99520EAd73da3a76AF533482D',
      1666600000: '0xC2B1FC77e49BE0a99520EAd73da3a76AF533482D',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://www.tranquil.finance/',
    harvest: true,
    tokenPerBlock: '0.21',
    sortOrder: 1,
    isFinished: false,
    startBlock: 17996500,
    endBlock: 18903700,
    tokenDecimals: 18,
   },
   {
    sousId: 2,
    tokenName: 'XYA',
    quoteTokenSymbol: QuoteToken.MIS,
    stakingTokenName: QuoteToken.MISXYA,
    stakingTokenAddress: '0xE22297CC3452aae66cEE6ED1cb437e96219c3319',
     // this is MIS
     quoteTokenPoolAddress: '0xd74433b187cf0ba998ad9be3486b929c76815215',
     // this is XYA
     tokenPoolAddress: '0x9b68bf4bf89c115c721105eaf6bd5164afcc51e4',
    contractAddress: {
      1666700000: '0x5aaf4bbECFf610186aeA98218f697029D5a77597',
      1666600000: '0x5aaf4bbECFf610186aeA98218f697029D5a77597',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://www.freyala.com/',
    harvest: true,
    tokenPerBlock: '0.1',
    sortOrder: 0,
    isFinished: false,
    startBlock: 17953943,
    endBlock: 18554800,
    tokenDecimals: 18,
   }, 
]

export default pools
