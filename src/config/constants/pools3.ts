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
      1666700000: '0xC9ED8bfb89F5B5ca965AA8cEAacF75576C06211E',
      1666600000: '0xC9ED8bfb89F5B5ca965AA8cEAacF75576C06211E',
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
