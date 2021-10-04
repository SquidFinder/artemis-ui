import React, { useCallback, useState } from 'react'
import { Button, useModal } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import useBetMoneyWheel from 'hooks/useBetMoneyWheel'
import { useMoneyWheelAllowance } from 'hooks/useAllowance'
import { useMoneyWheelApprove } from 'hooks/useApprove'
import { MoneyWheelBet } from 'config/constants/types'
import ConfirmBetModal from "./ConfirmBetModal"

// {
//     "0": "7",
//     "1": "1",
//     "2": "10000000000000000000",
//     "spin": "7",
//     "multiplier": "1",
//     "reward": "10000000000000000000"
// }

interface BetActionsProps {
    bet: MoneyWheelBet
    onResult: (lastResult : any) => void
}

const BetActions: React.FC<BetActionsProps> = ({ bet, onResult }) => {
    const [requestedApproval, setRequestedApproval] = useState(false)
    const { onApprove } = useMoneyWheelApprove()
    const allowance = useMoneyWheelAllowance()
    const { onBetMoneyWheel } = useBetMoneyWheel()    
    const TranslateString = useI18n()

    const onConfirm = async () => {
        const lastResult = await onBetMoneyWheel(bet)
        onResult(lastResult)
    }

    const onDismiss = () => {
        console.log("onDismiss")
    }

    const [onPresentBetConfirmation] = useModal(<ConfirmBetModal betValue={3} onConfirm={onConfirm} onDismiss={onDismiss} />)

    // ToDo: check this function (commented code)
    const handleApprove = useCallback(async () => {
        try {
          setRequestedApproval(true)
          const txHash = await onApprove()
          // user rejected tx or didn't go thru
          if (!txHash) {
            setRequestedApproval(false)
          }
          // onPresentApprove()
        } catch (e) {
          console.error(e)
        }
      }, [onApprove])

    const renderMoneyWheelActionButtons = () => {
        if (!allowance.toNumber()) {
            return (
                <>
                    <Button fullWidth disabled={requestedApproval} onClick={handleApprove}>
                        {TranslateString(999, 'Approve Lightning Wheel')}
                    </Button>
                </>
            )
        }
        return (
            <>
                <Button fullWidth onClick={onPresentBetConfirmation}>
                    {TranslateString(999, 'Place bet')}
                </Button>
            </>
        )
    }
    return (
        <>
            { renderMoneyWheelActionButtons() }
        </>
    )
}

export default BetActions 