import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const stake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(), account)
    .send({ from: account, gasPrice: 1000000000, gasLimit: 206490 })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStake = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account, gasPrice: 1000000000, gasLimit: 206490 })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousSingleStake = async (singleChefContract, amount, account) => {
  return singleChefContract.methods
  .deposit(
    new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(), account,)
    .send({ from: account, gasPrice: 1000000000, gasLimit: 2064900 })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
export const ifolock = async (ifoContract, account) => {
  return ifoContract.methods
    .depositCollateral()
    .send({ from: account, gasPrice: 1000000000, gasLimit: 206490 })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStakeBurn = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .transact(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account, gasPrice: 1000000000, gasLimit: 206490 })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStakeBnb = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, value: new BigNumber(amount).times(new BigNumber(10).pow(18)).toString() })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account, gasPrice: 1000000000, gasLimit: 206490 })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousUnstake = async (sousChefContract, amount, account) => {
  // shit code: hard fix for old CTK and BLK
  if (sousChefContract.options.address === '0xcD81CBB9248a6635e6Fd26C2991911FC6c01F85C') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  if (sousChefContract.options.address === '0xcD81CBB9248a6635e6Fd26C2991911FC6c01F85C') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  return sousChefContract.methods
    .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousEmegencyUnstake = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .emergencyWithdraw()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0', account)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvest = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit('0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvestBurn = async (sousChefContract, account) => {
  return sousChefContract.methods
    .transact('0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvestBnb = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit('0')
    .send({ from: account, value: new BigNumber(0) })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
