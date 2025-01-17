import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'
import labo  from './labo'


const farms: FarmConfig[] = [
  {
    pid:labo.pids.pidList[2],
    risk: 5,
    lpSymbol: 'MIS/ONE',
    lpAddresses: {
      1666700000: labo.addr.LaboBnbAddrTestnet,
      1666600000: labo.addr.LaboBnbAddr,
    },
    tokenSymbol: 'ONE',
    tokenAddresses: {
      1666700000: '0x7466d7d0c21fa05f32f5a0fa27e12bdc06348ce2',
      1666600000: '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a',
    },
    quoteTokenSymbol: QuoteToken.MIS,
    quoteTokenAdresses: contracts.cake,
    isDfkLP: true,
  },
  {
    pid:labo.pids.pidList[17],
    risk: 5,
    lpSymbol: 'MIS/stONE (SLP)',
    lpAddresses: {
      1666700000: '0x281ced1a3ee6d454dda3d212235a6fe5c834e28f',
      1666600000: '0x281ced1a3ee6d454dda3d212235a6fe5c834e28f',
    },
    tokenSymbol: 'stONE',
    tokenAddresses: {
      1666700000: '0x22d62b19b7039333ad773b7185bb61294f3adc19',
      1666600000: '0x22d62b19b7039333ad773b7185bb61294f3adc19',
    },
    quoteTokenSymbol: QuoteToken.MIS,
    quoteTokenAdresses: contracts.cake,
    isDfkLP: false,
  },
  {
    pid:labo.pids.pidList[8],
    risk: 5,
    lpSymbol: '1USDC/UST',
    lpAddresses: {
      1666700000: '0x7a16b6d01f96fdc5dd085c686806ba20aece99ea',
      1666600000: '0x7a16b6d01f96fdc5dd085c686806ba20aece99ea', 
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      1666700000: '0x985458e523db3d53125813ed68c274899e9dfab4',
      1666600000: '0x985458e523db3d53125813ed68c274899e9dfab4',
    },
    quoteTokenSymbol: QuoteToken.UST,
    quoteTokenAdresses: contracts.ust,
    isDfkLP: true,
  },
  {
    pid:labo.pids.pidList[0],
    risk: 5,
    lpSymbol: 'MIS/UST',
    lpAddresses: {
      1666700000: labo.addr.LaboBusdAddrTestnet,
      1666600000: labo.addr.LaboUstAddr, //
    },
    tokenSymbol: 'MIS',
    tokenAddresses: {
      1666700000: labo.addr.LaboAddrTestnet,
      1666600000: labo.addr.LaboAddr,
    },
    quoteTokenSymbol: QuoteToken.UST,
    quoteTokenAdresses: contracts.ust,
    isDfkLP: true,
  },
  {
    pid:labo.pids.pidList[13],
    risk: 3,
    lpSymbol: '1BTC/1ETH',
    lpAddresses: {
      1666700000: '0x997f00485b238c83f7e58c2ea1866dfd79f04a4b',
      1666600000: '0x997f00485b238c83f7e58c2ea1866dfd79f04a4b',
    },
    tokenSymbol: '1ETH',
    tokenAddresses: {
      1666700000: '0x6983d1e6def3690c4d616b13597a09e6193ea013',
      1666600000: '0x6983d1e6def3690c4d616b13597a09e6193ea013',
    },
    quoteTokenSymbol: QuoteToken.WBTC,
    quoteTokenAdresses: contracts.wbtc,
    isDfkLP: true,
  },
  {
    pid:labo.pids.pidList[5],
    risk: 5,
    lpSymbol: 'MIS/JEWEL',
    lpAddresses: {
      1666700000: '0x751606585fcaa73bf92cf823b7b6d8a0398a1c99',
      1666600000: '0x751606585fcaa73bf92cf823b7b6d8a0398a1c99',
    },
    tokenSymbol: 'JEWEL',
    tokenAddresses: {
      1666700000: '0x72cb10c6bfa5624dd07ef608027e366bd690048f',
      1666600000: '0x72cb10c6bfa5624dd07ef608027e366bd690048f',
    },
    quoteTokenSymbol: QuoteToken.MIS,
    quoteTokenAdresses: contracts.cake,
    isDfkLP: true,
  },
  {
    pid:labo.pids.pidList[3],
    risk: 3,
    lpSymbol: 'MIS/TRANQ',
    lpAddresses: {
      1666700000: '0xfA45e64Adf9BF3caDC65b737b2B0151C750f414C',
      1666600000: '0xfA45e64Adf9BF3caDC65b737b2B0151C750f414C',
    },
    tokenSymbol: 'TRANQ',
    tokenAddresses: {
      1666700000: '0xcf1709ad76a79d5a60210f23e81ce2460542a836',
      1666600000: '0xcf1709ad76a79d5a60210f23e81ce2460542a836',
    },
    quoteTokenSymbol: QuoteToken.MIS,
    quoteTokenAdresses: contracts.cake,
    isDfkLP: true,
  },
  {
    pid:labo.pids.pidList[7],
    risk: 5,
    lpSymbol: 'MIS/FOX',
    lpAddresses: {
      1666700000: '0xe9425769e13d3f928c483726de841999648e9cfd',
      1666600000: '0xe9425769e13d3f928c483726de841999648e9cfd', 
    },
    tokenSymbol: 'FOX',
    tokenAddresses: {
      1666700000: '0x0159ed2e06ddcd46a25e74eb8e159ce666b28687',
      1666600000: '0x0159ed2e06ddcd46a25e74eb8e159ce666b28687',
    },
    quoteTokenSymbol: QuoteToken.MIS,
    quoteTokenAdresses: contracts.cake,
    isDfkLP: true,
  },
  {
    pid:labo.pids.pidList[18],
    risk: 5,
    lpSymbol: 'MIS/IMRTL',
    lpAddresses: {
      1666700000: '0x3b200557a1884ff3ee21486d4250a9571be6f81e',
      1666600000: '0x3b200557a1884ff3ee21486d4250a9571be6f81e',
    },
    tokenSymbol: 'IMRTL',
    tokenAddresses: {
      1666700000: '0x550d9923693998a6fe20801abe3f1a78e0d75089',
      1666600000: '0x550d9923693998a6fe20801abe3f1a78e0d75089',
    },
    quoteTokenSymbol: QuoteToken.MIS,
    quoteTokenAdresses: contracts.cake,
    isDfkLP: true,
  },
  {
    pid:labo.pids.pidList[10],
    risk: 5,
    lpSymbol: 'MIS/rFTM',
    lpAddresses: {
      1666700000: '0x3f5965eeece3a56fb499b8e41b26040806e1a2f7',
      1666600000: '0x3f5965eeece3a56fb499b8e41b26040806e1a2f7',
    },
    tokenSymbol: 'RFTM',
    tokenAddresses: {
      1666700000: '0xd647090c1cdcdbb72de411b1ba16f03d4a7bba02',
      1666600000: '0xd647090c1cdcdbb72de411b1ba16f03d4a7bba02',
    },
    quoteTokenSymbol: QuoteToken.MIS,
    quoteTokenAdresses: contracts.cake,
    isDfkLP: true,
  },
  {
    pid:labo.pids.pidList[4],
    risk: 5,
    lpSymbol: 'MIS/wBTC',
    lpAddresses: {
      1666700000: '0x40e10c0edf8d412ce9d62cfe98cc0958eefaea94',
      1666600000: '0x40e10c0edf8d412ce9d62cfe98cc0958eefaea94', 
    },
    tokenSymbol: 'WBTC',
    tokenAddresses: {
      1666700000: '0x3095c7557bcb296ccc6e363de01b760ba031f2d9',
      1666600000: '0x3095c7557bcb296ccc6e363de01b760ba031f2d9',
    },
    quoteTokenSymbol: QuoteToken.MIS,
    quoteTokenAdresses: contracts.cake,
    isDfkLP: true,
  },
  {
    pid:labo.pids.pidList[9],
    risk: 5,
    lpSymbol: 'MIS/LUNA',
    lpAddresses: {
      1666700000: '0x5456fd0cfbc4cdd9a08c89da9cf09a6afc73dc28',
      1666600000: '0x5456fd0cfbc4cdd9a08c89da9cf09a6afc73dc28', 
    },
    tokenSymbol: 'LUNA',
    tokenAddresses: {
      1666700000: '0x95ce547d730519a90def30d647f37d9e5359b6ae',
      1666600000: '0x95ce547d730519a90def30d647f37d9e5359b6ae',
    },
    quoteTokenSymbol: QuoteToken.MIS,
    quoteTokenAdresses: contracts.cake,
    isDfkLP: true,
  },
  {
    pid:labo.pids.pidList[15],
    risk: 5,
    lpSymbol: 'MIS/LUMEN',
    lpAddresses: {
      1666700000: '0xfd3ab633de7a747ceacafdad6575df1d737d659e',
      1666600000: '0xfd3ab633de7a747ceacafdad6575df1d737d659e',
    },
    tokenSymbol: 'LUMEN',
    tokenAddresses: {
      1666700000: '0xDA7fE71960cd1C19E1b86D6929efD36058F60a03',
      1666600000: '0xDA7fE71960cd1C19E1b86D6929efD36058F60a03',
    },
    quoteTokenSymbol: QuoteToken.MIS,
    quoteTokenAdresses: contracts.cake,
    isDfkLP: true,
  },
  {
    pid:labo.pids.pidList[6],
    risk: 5,
    lpSymbol: 'MIS/XYA',
    lpAddresses: {
      1666700000: '0xe22297cc3452aae66cee6ed1cb437e96219c3319',
      1666600000: '0xe22297cc3452aae66cee6ed1cb437e96219c3319',
    },
    tokenSymbol: 'XYA',
    tokenAddresses: {
      1666700000: '0x9b68bf4bf89c115c721105eaf6bd5164afcc51e4',
      1666600000: '0x9b68bf4bf89c115c721105eaf6bd5164afcc51e4',
    },
    quoteTokenSymbol: QuoteToken.MIS,
    quoteTokenAdresses: contracts.cake,
    isDfkLP: true,
  },
  {
    pid:labo.pids.pidList[11],
    risk: 5,
    lpSymbol: 'MIS/RVRS',
    lpAddresses: {
      1666700000: '0x14ec453656ce925c969eaffcd76d62aca2468eb6',
      1666600000: '0x14ec453656ce925c969eaffcd76d62aca2468eb6', 
    },
    tokenSymbol: 'RVRS',
    tokenAddresses: {
      1666700000: '0xed0b4b0f0e2c17646682fc98ace09feb99af3ade',
      1666600000: '0xed0b4b0f0e2c17646682fc98ace09feb99af3ade',
    },
    quoteTokenSymbol: QuoteToken.MIS,
    quoteTokenAdresses: contracts.cake,
    isDfkLP: true,
  },
  {
    pid:labo.pids.pidList[1],
    risk: 3,
    lpSymbol: 'ONE/UST',
    lpAddresses: {
      1666700000: '0x0fd43eb53e9c80eb439dc47da7539d8b6f71dc1e',
      1666600000: '0x61356c852632813f3d71d57559b06cdff70e538b',
    },
    tokenSymbol: 'ONE',
    tokenAddresses: {
      1666700000: '0x7466d7d0c21fa05f32f5a0fa27e12bdc06348ce2',
      1666600000: '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a',
    },
    quoteTokenSymbol: QuoteToken.UST,
    quoteTokenAdresses: contracts.ust,
    isDfkLP: true,
  },
  {
    pid:labo.pids.pidList[14],
    risk: 5,
    lpSymbol: 'MIS/COINKX',
    lpAddresses: {
      1666700000: '0xc593893ed4b5f97cb64808c640e48b18a80e61ff',
      1666600000: '0xc593893ed4b5f97cb64808c640e48b18a80e61ff', 
    },
    tokenSymbol: 'COINKX',
    tokenAddresses: {
      1666700000: '0x7ca9c1d0bb11f1b7c31ee5538d7a75aaf2d8e2fc',
      1666600000: '0x7ca9c1d0bb11f1b7c31ee5538d7a75aaf2d8e2fc',
    },
    quoteTokenSymbol: QuoteToken.MIS,
    quoteTokenAdresses: contracts.cake,
    isDfkLP: true,
  },

  
]

export default farms
