import addresses from 'config/constants/contracts'

const chainId = process.env.REACT_APP_CHAIN_ID

export const getCakeAddress = () => {
  return addresses.cake[chainId]
}
export const getMasterChefAddress = () => {
  return addresses.masterChef[chainId]
}
export const getSousChefAddress = () => {
  return addresses.sousChef[chainId]
}
export const getMulticallAddress = () => {
  return addresses.mulltiCall[chainId]
}
export const getWbnbAddress = () => {
  return addresses.wbnb[chainId]
}
export const getOneAddress = () => {
  return addresses.one[chainId]
}
export const getLotteryAddress = () => {
  return addresses.lottery[chainId]
}
export const getWheelAddress = () => {
  return addresses.wheel[chainId]
}
export const getWheel2Address = () => {
  return addresses.wheel2[chainId]
}
export const getLotteryTicketAddress = () => {
  return addresses.lotteryNFT[chainId]
}
export const getIfoAddress = () => {
  return addresses.ifo[chainId]
}
export const getAutoRvrsAddress = () => {
  return addresses.autoRVRS[chainId]
}