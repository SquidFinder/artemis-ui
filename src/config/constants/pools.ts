import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    tokenName: 'WONE',
    stakingTokenName: QuoteToken.MISONE,
    stakingTokenAddress: '0x31222d37568BD54be95eCE3749f0559c45a85634',
    contractAddress: {
      1666700000: '0x736E9c99cb9f9c39e25eF61181eeC83d484F9120',
      1666600000: '0xc078b878ae6BB14a8734d8a788F496984Cc7dde2',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://www.harmony.one/',
    harvest: true,
    tokenPerBlock: '1',
    sortOrder: 1,
    isFinished: false,
    startBlock: 15499711,
    endBlock: 20499711,
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
