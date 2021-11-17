import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import TokenInput from 'components/TokenInput'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'
import styled from 'styled-components'

interface DepositModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  valueUsd?: number
  depositFeeBP?: number
}

const StyledBtn = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-color: #292C44;
  border: 1px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 10px;
  color: #FFFF;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  display: inline-flex;
  min-height: 25px;
  max-height: 35px;
  min-width: 95px;
  max-width: 100px;
  padding: 20px;
  box-shadow: 0px 0px 2px #ccc;
  text-shadow: 0px 0px 2px #ccc;
`

const DepositModal: React.FC<DepositModalProps> = (
    { max, onConfirm, onDismiss, tokenName = '' , depositFeeBP = 0, valueUsd= 0}) => {
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

  return (
    <Modal title={`${TranslateString(316, 'Deposit')} ${tokenName}`} onDismiss={onDismiss}>
      <TokenInput
        value={val}
        valueUsd={valueUsd}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
        depositFeeBP={depositFeeBP}
      />
      <ModalActions>
        <StyledBtn       
          style={{justifyContent:"center"}}
          onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </StyledBtn>
        <StyledBtn
          style={{justifyContent:"center"}}
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()}}>
          {pendingTx ? TranslateString(488, '...') : TranslateString(4614, 'Stake')}
        </StyledBtn>
      </ModalActions>
    </Modal>
  )
}

export default DepositModal
