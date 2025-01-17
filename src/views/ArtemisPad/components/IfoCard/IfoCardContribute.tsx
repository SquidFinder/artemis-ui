import React, { useState, useEffect } from 'react'
import { useModal, Button, Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import { useERC20 } from 'hooks/useContract'
import {useIfoAllowance, useIfoHasCollat} from 'hooks/useAllowance'
import { useIfoApprove } from 'hooks/useApprove'
import  { useIfoCollatLock }  from 'hooks/useStake'
import { IfoStatus } from 'config/constants/types'
import { getBalanceNumber } from 'utils/formatBalance'
import { FaCheck, FaCheckCircle, FaFlagCheckered, FaLock, FaUserCheck } from 'react-icons/fa'
import styled from 'styled-components'
import LabelButton from './LabelButton'
import ContributeModal from './ContributeModal'



export interface Props {
  address: string
  currency: string
  currencyAddress: string
  collatAddr: string
  contract: Contract
  totalAmount: BigNumber
  status: IfoStatus
  raisingAmount: BigNumber
  misAmount: string
  tokenDecimals: number
}

const StyledButton = styled.button`
  align-items: center;
  background-image: linear-gradient(#2F324A, #2F324A);
  border:1px solid #CECECE;
  border-color: #FFFF;
  border-radius: 10px;
  color: #FFFF;
  font-size: 14px;
  font-weight: 300;
  display: inline-flex;
  height: 14px;
  width: 150px;
  padding: 17px;
  box-shadow: 0px 0px 0px #ccc;
  text-shadow: 0px 0px 10px #ccc;
  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    outline: 0;
    border-color: #FFFF;
    cursor: pointer;
    box-shadow: 0px 0px 2px #fff;
  }
`

const LockMisButton = styled.button`
  align-items: center;
  background-image: linear-gradient(#2F324A, #2F324A);
  border:1px solid #CECECE;
  border-color: #FFFF;
  border-radius: 10px;
  color: #FFFF;
  font-size: 14px;
  font-weight: 300;
  display: inline-flex;
  height: 14px;
  width: 220px;
  padding: 17px;
  box-shadow: 0px 0px 0px #ccc;
  text-shadow: 0px 0px 10px #ccc;
  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    outline: 0;
    border-color: #FFFF;
    cursor: pointer;
    box-shadow: 0px 0px 2px #fff;
  }
`

const IfoCardContribute: React.FC<Props> = ({
  address,
  currency,
  currencyAddress,
  collatAddr,
  contract,
  misAmount,
  status,
  totalAmount,
  raisingAmount,
  tokenDecimals,
}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const [offeringTokenBalance, setOfferingTokenBalance] = useState(new BigNumber(0))
  const [userInfo, setUserInfo] = useState({ amount: 0, claimed: false })
  const { account } = useWallet()
  const contractRaisingToken = useERC20(currencyAddress)
  const collatToken = useERC20(collatAddr)
  const [mislocked, setMisLocked] = useState(0)

  const allowance = useIfoAllowance(contractRaisingToken, address, pendingTx)
  const collatallowance = useIfoAllowance(collatToken, address, pendingTx)
  const hasCollat = useIfoHasCollat(address, pendingTx)


  const onApprove = useIfoApprove(contractRaisingToken, address)
  const onApprove2 = useIfoApprove(collatToken, address)

  const { onLock } = useIfoCollatLock(address)

  const [onPresentContributeModal] = useModal(
    <ContributeModal currency={currency} contract={contract} currencyAddress={currencyAddress} />,
  )

  useEffect(() => {
    const fetch = async () => {
      const balance = new BigNumber(await contract.methods.getOfferingAmount(account).call())
      const userinfo = await contract.methods.userInfo(account).call()

      setUserInfo(userinfo)
      setOfferingTokenBalance(balance)
    }

    if (account) {
      fetch()
    }
  }, [account, contract.methods, pendingTx])

  if (allowance === null) {
    return null
  }

  const claim = async () => {
    setPendingTx(true)
    await contract.methods.harvest().send({ from: account })
    setPendingTx(false)
  }
  const isFinished = status === 'finished'
  const percentOfUserContribution = new BigNumber(userInfo.amount).div(totalAmount).times(100)

  if (!isFinished && allowance <= 0) {
    return (
      <StyledButton
        style={{justifyContent:'center'}}
        disabled={pendingTx || isFinished}
        onClick={async () => {
          try {
            setPendingTx(true)
            await onApprove()
            setPendingTx(false)
          } catch (e) {
            setPendingTx(false)
            console.error(e)
          }
        }}
      >
        <FaCheck/>&nbsp;Approve wONE
      </StyledButton>
    )
  }

  if (!isFinished && collatallowance <= 0) {
    return (
      <>
      <StyledButton
        style={{justifyContent:'center'}}
        disabled={pendingTx || isFinished}
        onClick={async () => {
          try {
            setPendingTx(true)
            setMisLocked(0)
            await onApprove2()
            setPendingTx(false)

          } catch (e) {
            setPendingTx(false)
            setMisLocked(0)
            console.error(e)
          }
        }}
      >
        <FaCheck/>&nbsp;Approve MIS 
      </StyledButton>

    </>
    )
  }

  if (!isFinished && !hasCollat && mislocked <=0) {
    return (
      <>
      <LockMisButton
        style={{justifyContent:'center'}}
        disabled={pendingTx || isFinished}
        onClick={async () => {
          try {
            setPendingTx(true)
            await onLock()
            setPendingTx(false)
            setMisLocked(1)
          } catch (e) {
            setPendingTx(false)
            setMisLocked(0)
            console.error(e)
          }
        }}
      >
        <FaLock/>&nbsp;Lock {misAmount} Collateral  
      </LockMisButton>

    </>
    )
  }


  return (
    <>

      <LabelButton
        disabled={pendingTx || userInfo.claimed}
        buttonLabel={isFinished ? 'Claim All' : 'Contribute'}
        label={isFinished ? '' : ``}
        value={
          // eslint-disable-next-line no-nested-ternary
          isFinished
            ? userInfo.claimed
              ? 'Claimed'
              : getBalanceNumber(offeringTokenBalance, tokenDecimals).toFixed(4)
            : getBalanceNumber(new BigNumber(userInfo.amount)).toFixed(4)
        }
        onClick={isFinished ? claim : onPresentContributeModal}
      />
      <Sub style={{marginTop:'10px', marginLeft:'5px'}}>
        {isFinished
          ? ``
          : `${currency} Contributed: ${percentOfUserContribution.toFixed(4)}% Of Total`}
      </Sub>
    </>
  )
}

const Sub = styled.p`
  color: #D4D4D4;
  font-size: 13px;
  font-weight: 300;
  margin-bottom: 0px;
  margin-top: 2px;
  text-shadow: 0px 0px 0px #D4D4D4;
`



export default IfoCardContribute
