import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import styled from 'styled-components'
import TokenInput from '../../../components/TokenInput'
import useI18n from '../../../hooks/useI18n'
import { getFullDisplayBalance } from '../../../utils/formatBalance'

interface WithdrawModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
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

const WithdrawModal: React.FC<WithdrawModalProps> = ({ onConfirm, onDismiss, max, tokenName = '' }) => {
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
    <Modal title={`Withdraw ${tokenName}` } onDismiss={onDismiss}>
    {/* <WarningWithdraw>
        {TranslateString(999, 'Warning! It withdraws all of your staked tokens!')}
        <br />
        {TranslateString(999, 'It is advised to not do so until the pool is over!')}
        <br />
        </WarningWithdraw> */}
      <TokenInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={fullBalance}
        symbol={tokenName}
      />
      <ModalActions>
        <StyledBtn style={{justifyContent:"center" }} onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </StyledBtn>
        <StyledBtn style={{justifyContent:"center" }}
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? TranslateString(4881, '...') : TranslateString(464, 'Confirm')}
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
