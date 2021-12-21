import React, { useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Modal, Button, Flex, LinkExternal } from '@pancakeswap-libs/uikit'
import BalanceInput from 'components/Input/BalanceInput'
import useTokenBalance from 'hooks/useTokenBalance'
import { getFullDisplayBalance } from 'utils/formatBalance'
import styled from 'styled-components'
import { FaArrowRight } from 'react-icons/fa'

interface Props {
  currency: string
  contract: any
  currencyAddress: string
  onDismiss?: () => void
}

const StyledBtn = styled.button`
  display: inline-flex;
  align-items: center;
  background-image: linear-gradient(#2F324A, #2F324A);
  border-radius: 10px;
  border: 1px solid #CECECE;
  height: 45px;
  width: 100px;
  color: #FFFF;
  font-size: 14px;
  font-weight: 400;
  padding: 15px;
  margin-top: 15px;
  margin-bottom: 10px;
  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    outline: 0;
    border-color: #FFFF;
    cursor: pointer;
    text-shadow: 0px 0px 10px #fff;
  }
  `
  
const ContributeModal: React.FC<Props> = ({ currency, contract, currencyAddress, onDismiss }) => {
  const [value, setValue] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const balance = getFullDisplayBalance(useTokenBalance(currencyAddress))

  return (
    <Modal title={`Contribute ${currency}`} onDismiss={onDismiss}>
      <BalanceInput
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        symbol={currency}
        max={balance}
        onSelectMax={() => setValue(balance.toString())}
      />
      <Flex justifyContent="center">

        <StyledBtn
          style={{justifyContent:'center', marginRight:'25px'}}
          onClick={onDismiss}
          >
          Cancel
        </StyledBtn>

        <StyledBtn
          style={{justifyContent:'center', marginLeft:'25px'}}
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await contract.methods
              .deposit(new BigNumber(value).times(new BigNumber(10).pow(18)).toString())
              .send({ from: account })
            setPendingTx(false)
            onDismiss()
          }}
        >
          Confirm
        </StyledBtn>

      </Flex>

    </Modal>
  )
}

const Sub = styled.p`
  color: #FFFF;
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 0px;
  margin-top: 0px;
  text-shadow: 0px 0px 0px #4E5C6D;
`

export default ContributeModal
