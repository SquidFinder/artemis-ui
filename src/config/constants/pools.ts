import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 1,
    tokenName: QuoteToken.TRANQ,
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
    sortOrder: 12,
    isFinished: false,
    startBlock: 17996500,
    endBlock: 18903700,
    tokenDecimals: 18,
   },
   {
    sousId: 2,
    tokenName: QuoteToken.XYA,
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
    sortOrder: 11,
    isFinished: false,
    startBlock: 17953943,
    endBlock: 18554800,
    tokenDecimals: 18,
   },
   {
    sousId: 3,
    tokenName: 'MAGIC',
    quoteTokenSymbol: QuoteToken.MIS,
    stakingTokenName: QuoteToken.MISMAGIC,
    // this is MIS-MAGIC
    stakingTokenAddress: '0xf8a37164e8273cb89e631a76c53af8ad55e6af4e',
     // this is MIS
     quoteTokenPoolAddress: '0xd74433b187cf0ba998ad9be3486b929c76815215',
     // this is MAGIC
     tokenPoolAddress: '0x892d81221484f690c0a97d3dd18b9144a3ecdfb7',
    contractAddress: {
      1666700000: '0x5439dE99DF8e4279a87F1775601ba3Aaa952b4cb',
      1666600000: '0x5439dE99DF8e4279a87F1775601ba3Aaa952b4cb',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://cosmicguild.one/',
    harvest: true,
    tokenPerBlock: '0.08',
    sortOrder: 10,
    isFinished: false,
    startBlock: 18099632,
    endBlock: 19002100,
    tokenDecimals: 18,
   },
   {
    sousId: 4,
    tokenName: 'WONE',
    quoteTokenSymbol: QuoteToken.MIS,
    stakingTokenName: QuoteToken.MIS,
    // this is MIS
    stakingTokenAddress: '0xd74433b187cf0ba998ad9be3486b929c76815215',
     // this is MIS
     quoteTokenPoolAddress: '0xd74433b187cf0ba998ad9be3486b929c76815215',
     // this is WONE
     tokenPoolAddress: '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a',
    contractAddress: {
      1666700000: '0xfA25b3b7060b2588eb95a396Ab72bDd99cEc556f',
      1666600000: '0xfA25b3b7060b2588eb95a396Ab72bDd99cEc556f',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://www.harmony.one/',
    harvest: true,
    tokenPerBlock: '0.076',
    sortOrder: 9,
    isFinished: false,
    startBlock: 18132634,
    endBlock: 19039000,
    tokenDecimals: 18,
   }, 
]

export default pools
