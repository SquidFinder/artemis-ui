import { QuoteToken, PoolCategory, Pool2Config } from './types'

const pools2: Pool2Config[] = [
  {
    sousId: 1,
    tokenName: 'MIS',
    quoteTokenSymbol: QuoteToken.MIS,
    stakingTokenName: QuoteToken.MIS,
    // this is MIS
    stakingTokenAddress: '0xd74433b187cf0ba998ad9be3486b929c76815215',
    // this is MIS
    quoteTokenPoolAddress: '0xd74433b187cf0ba998ad9be3486b929c76815215',
    // this is MIS
    tokenPoolAddress: '0xd74433b187cf0ba998ad9be3486b929c76815215',
    contractAddress: {
      1666700000: '0xf637FfEf4E6De7120fa7Befa0AA0Ce26fED69192',
      1666600000: '0xf637FfEf4E6De7120fa7Befa0AA0Ce26fED69192',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://www.app.artemisprotocol.one',
    harvest: true,
    tokenPerBlock: '0.001',
    sortOrder: 12,
    isFinished: false,
    isDepositFinished: false,
    startBlock: 18474498,
    endBlock: 18494498,
    tokenDecimals: 18,
   },
]

export default pools2
