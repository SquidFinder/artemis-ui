import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'MIS',
    earnToken: 'MIS',
    quoteTokenSymbol: QuoteToken.MIS,
    stakingTokenName: QuoteToken.MIS,
    stakingTokenAddress: '0xD74433B187Cf0ba998Ad9Be3486B929c76815215',
    // this is MIS
    quoteTokenPoolAddress: '0xD74433B187Cf0ba998Ad9Be3486B929c76815215',
    // this is MIS
    tokenPoolAddress: '0xD74433B187Cf0ba998Ad9Be3486B929c76815215',
    contractAddress: {
      1666700000: '0x6AAEA0A742056e5A6AA1a428A8EC403C1B964609',
      1666600000: '0x6AAEA0A742056e5A6AA1a428A8EC403C1B964609',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://www.tranquil.finance/',
    // TODO - fix below
    harvest: false,
    tokenPerBlock: '0.21',
    sortOrder: 1,
    isFinished: false,
    startBlock: 17996500,
    endBlock: 920000000,
    tokenDecimals: 18,
   },
]

export default pools
