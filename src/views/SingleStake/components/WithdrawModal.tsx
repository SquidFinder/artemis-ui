import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import styled from 'styled-components'
import TokenInput from '../../../components/TokenInput'
import useI18n from '../../../hooks/useI18n'
import { getFullDisplayBalance } from '../../../utils/formatBalance'


const DEFAULT_TOKEN_DECIMALS = new BigNumber(10).pow(18)

interface WithdrawModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  pricePerShare?: BigNumber
  tokenName?: string
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
  }
  `

const WithdrawModal: React.FC<WithdrawModalProps> = ({ onConfirm, onDismiss, max, tokenName = '', pricePerShare= DEFAULT_TOKEN_DECIMALS }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const getSharesFromAmount = (amount) => {
      const shares = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMALS).div(pricePerShare)
      console.log('getSharesFromAmount', pricePerShare, amount, shares.toString())
      return shares.toFixed(18).toString()
  }

  return (
    <Modal title={`Unstake ${tokenName}` } onDismiss={onDismiss}>

      <TokenInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={fullBalance}
        symbol={tokenName}
      />
      <ModalActions>
        <StyledBtn 
          onClick={onDismiss}
          style={{justifyContent:"center" }}>

          {TranslateString(4162, 'Cancel')}
        </StyledBtn>
        <StyledBtn
          style={{justifyContent:"center" }}
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(getSharesFromAmount(val))
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? TranslateString(4828, '...') : TranslateString(4164, 'Confirm')}
        </StyledBtn>
      </ModalActions>
    </Modal>
  )
}

const WarningWithdraw = styled.div`
  text-align: left;
  overflow-y: auto;
  max-height: 400px;
  color: ${(props) => props.theme.colors.primary};
`

export default WithdrawModal
