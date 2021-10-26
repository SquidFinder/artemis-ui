import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 1,
    tokenName: QuoteToken.TRANQ,
    earnToken: QuoteToken.TRANQ,
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
    tokenName: QuoteToken.XYA,
    earnToken: QuoteToken.XYA,
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
    sortOrder: 20,
    isFinished: false,
    startBlock: 17953943,
    endBlock: 18554800,
    tokenDecimals: 18,
   },
   {
    sousId: 3,
    tokenName: 'MAGIC',
    earnToken: 'MAGIC',
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
    sortOrder: 3,
    isFinished: false,
    startBlock: 18099632,
    endBlock: 19002100,
    tokenDecimals: 18,
   },
   {
    sousId: 4,
    tokenName: 'WONE',
    earnToken: 'WONE',
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
    sortOrder: 0,
    isFinished: false,
    startBlock: 18132634,
    endBlock: 19039000,
    tokenDecimals: 18,
   },
   {
    sousId: 5,
    tokenName: 'LBLOX',
    earnToken: 'LBLOX',
    quoteTokenSymbol: QuoteToken.MIS,
    stakingTokenName: QuoteToken.MISLBLOX,
    // this is MIS-LBLOX
    stakingTokenAddress: '0xde0cb446c75f05a87f8784fc2738a654ba6d81f3',
     // this is MIS
     quoteTokenPoolAddress: '0xd74433b187cf0ba998ad9be3486b929c76815215',
     // this is LBLOX
     tokenPoolAddress: '0xd62bD801A1cb65532DeF9908c67B8C00f432C1bb',
    contractAddress: {
      1666700000: '0x5c75cBb9896e21b1A21118Fad5845D9139A7bff4',
      1666600000: '0x5c75cBb9896e21b1A21118Fad5845D9139A7bff4',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://lootblocks.one/',
    harvest: true,
    tokenPerBlock: '33000',
    sortOrder: 6,
    isFinished: false,
    startBlock: 18176482,
    endBlock: 18781282,
    tokenDecimals: 18,
   },
   {
    sousId: 6,
    tokenName: 'MIS',
    earnToken: 'MISCOINK',
    quoteTokenSymbol: QuoteToken.MIS,
    stakingTokenName: QuoteToken.MISCOINK,
    // this is MIS-COINK
    stakingTokenAddress: '0x7c0e36ca3d1ae25d26e259c3f19fef610f4a2ed2',
     // this is MIS
     quoteTokenPoolAddress: '0xd74433b187cf0ba998ad9be3486b929c76815215',
     // this is COINK
     tokenPoolAddress: '0x4970417a897cc7ae812b9b8db34bb44833c26739',
    contractAddress: {
      1666700000: '0x483878Ce16745d5A9403faE2dF521997724E683B',
      1666600000: '0x483878Ce16745d5A9403faE2dF521997724E683B',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://piggybank.farm/#/',
    harvest: true,
    tokenPerBlock: '0.00247',
    sortOrder: 5,
    isFinished: false,
    startBlock: 18179363,
    endBlock: 19388863,
    tokenDecimals: 18,
   },
   {
    sousId: 7,
    tokenName: 'TROLL',
    earnToken: 'TROLL',
    quoteTokenSymbol: QuoteToken.MIS,
    stakingTokenName: QuoteToken.MISTROLL,
    // this is MIS-TROLL
    stakingTokenAddress: '0xc18772c8cb3e9091f8205512594a1eca7d462535',
     // this is MIS
     quoteTokenPoolAddress: '0xd74433b187cf0ba998ad9be3486b929c76815215',
     // this is XYA
     tokenPoolAddress: '0x25dcee96fcd63ad88b812cce02b3fcf7d1504f2d',
    contractAddress: {
      1666700000: '0x0f182FB2bD1DA8217E0d7A71702CEbb61b50BE39',
      1666600000: '0x0f182FB2bD1DA8217E0d7A71702CEbb61b50BE39',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://lootswap.finance/guilds/troll',
    harvest: true,
    tokenPerBlock: '0.33',
    sortOrder: 7,
    isFinished: false,
    startBlock: 18221784,
    endBlock: 20640795,
    tokenDecimals: 18,
   },
   {
    sousId: 8,
    tokenName: 'LUNA',
    earnToken: 'LUNA',
    quoteTokenSymbol: QuoteToken.MIS,
    stakingTokenName: QuoteToken.MIS,
    // this is MIS
    stakingTokenAddress: '0xd74433b187cf0ba998ad9be3486b929c76815215',
     // this is MIS
     quoteTokenPoolAddress: '0xd74433b187cf0ba998ad9be3486b929c76815215',
     // this is LUNA
     tokenPoolAddress: '0x95ce547d730519a90def30d647f37d9e5359b6ae',
    contractAddress: {
      1666700000: '0xea3224D190c861aF3b867d30E7e07dD97a698294',
      1666600000: '0xea3224D190c861aF3b867d30E7e07dD97a698294',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://www.terra.money/',
    harvest: true,
    tokenPerBlock: '0.000346', // 0.000346
    sortOrder: 1,
    isFinished: false,
    startBlock: 18337525,
    endBlock: 19244225,
    tokenDecimals: 18,
   },
   {
    sousId: 9,
    tokenName: 'MIS',
    earnToken: 'MISKURO',
    quoteTokenSymbol: QuoteToken.MIS,
    stakingTokenName: QuoteToken.MISKURO,
    // this is MIS-KURO
    stakingTokenAddress: '0x8996880455c51b87e1821201155207f7e3f4cf53',
     // this is MIS
     quoteTokenPoolAddress: '0xd74433b187cf0ba998ad9be3486b929c76815215',
     // this is KURO
     tokenPoolAddress: '0x3e018675c0ef63eb361b9ef4bfea3a3294c74c7b',
    contractAddress: {
      1666700000: '0xE5203362A7cc8208fDaC0cDC807d7521B1E40eF2',
      1666600000: '0xE5203362A7cc8208fDaC0cDC807d7521B1E40eF2',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://www.kuroshiba.one/',
    harvest: true,
    tokenPerBlock: '0.0065', // 0.0065
    sortOrder: 4,
    isFinished: false,
    startBlock: 18589529,
    endBlock: 20101500,
    tokenDecimals: 18,
   },
   {
    sousId: 10,
    tokenName: 'SONIC',
    earnToken: 'SONIC',
    quoteTokenSymbol: QuoteToken.MIS,
    stakingTokenName: QuoteToken.MISSONIC,
    // this is MIS-SONIC
    stakingTokenAddress: '0xaa9d59ea5b2251b71e548da5ecdc4a7dc010d8fb',
     // this is MIS
     quoteTokenPoolAddress: '0xd74433b187cf0ba998ad9be3486b929c76815215',
     // this is SONIC
     tokenPoolAddress: '0x1e05c8b69e4128949fcef16811a819ef2f55d33e',
    contractAddress: {
      1666700000: '0xfa916aE5E3CE8CBabb0345FCd5c7d73f8A116dFe',
      1666600000: '0xfa916aE5E3CE8CBabb0345FCd5c7d73f8A116dFe',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://sonicswap.io/#/',
    harvest: true,
    tokenPerBlock: '0.181 ',
    sortOrder: 5,
    isFinished: false,
    startBlock: 18600095,
    endBlock: 19204815,
    tokenDecimals: 18,
   },
]

export default pools
