import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserStakedBalance, updateUserBalance } from 'state/actions'
import { stake, sousStake, sousStakeBurn, ifolock, sousSingleStake } from 'utils/callHelpers'
import { useAutoRvrs, useIfoContract, useMasterchef, useSousChef, useSousChefBurn } from './useContract'

const useStake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onStake: handleStake }
}

export const useSousStake = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const sousChefContract = useSousChef(sousId)

  const handleSousStake = useCallback(
    async (amount: string) => {
      if (sousId === 0) {
        await sousStake(sousChefContract, amount, account)
      } else {
        await sousStake(sousChefContract, amount, account)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
    },
    [account, dispatch, sousChefContract, sousId],
  )

  return { onStake: handleSousStake }
}

export const useSousStake3 = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const sousChefContract = useAutoRvrs()

  const handleSousStake3 = useCallback(
    async (amount: string) => {
      if (sousId === 0) {
        await sousSingleStake(sousChefContract, amount, account)
      } else {
        await sousSingleStake(sousChefContract, amount, account)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
    },
    [account, dispatch, sousChefContract, sousId],
  )

  return { onStake: handleSousStake3 }
}

export const useSousStakeBurn = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const sousChefContract = useSousChefBurn(sousId)

  const handleSousStake = useCallback(
    async (amount: string) => {
      if (sousId === 0) {
        await sousStakeBurn(sousChefContract, amount, account)
      } else {
        await sousStakeBurn(sousChefContract, amount, account)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
    },
    [account, dispatch, sousChefContract, sousId],
  )

  return { onStake: handleSousStake }
}

export const useIfoCollatLock = (address) => {
  const { account } = useWallet()
  const ifoContract = useIfoContract(address)

  const handleIfoStake = useCallback(
    async () => { 
      const txHash = await ifolock(ifoContract, account)
      console.info(txHash)
    },
    [account, ifoContract],
  )

  return { onLock: handleIfoStake }
}

export default useStake
