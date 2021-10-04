import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Modal } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import { MoneyWheelBet } from 'config/constants/types'
import useI18n from '../../../hooks/useI18n'

interface ConfirmBetModalProps {
    // eslint-disable-next-line react/no-unused-prop-types
    betValue: number
    onConfirm: () => void
    onDismiss?: () => void
    tokenName?: string
}

const ConfirmBetModal: React.FC<ConfirmBetModalProps> = ({ onConfirm, onDismiss, tokenName }) => {
    const [pendingTx, setPendingTx] = useState(false)
    const TranslateString = useI18n()

    return(
        <Modal title="Are you sure you want to place your bet?" onDismiss={onDismiss}>
            <ModalActions>
                <Button fullWidth variant="secondary" onClick={onDismiss}>
                {TranslateString(462, 'Cancel')}
                </Button>
                <Button
                fullWidth
                disabled={pendingTx}
                onClick={async () => {
                    setPendingTx(true)
                    await onConfirm()
                    setPendingTx(false)
                    onDismiss()
                }}
                >
                {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
                </Button>
            </ModalActions>
        </Modal>
    )
}

export default ConfirmBetModal 