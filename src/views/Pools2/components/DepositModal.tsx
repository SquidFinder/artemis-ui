import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import styled from 'styled-components'
import { FaQuestionCircle } from 'react-icons/fa'
import TokenInput from '../../../components/TokenInput'
import useI18n from '../../../hooks/useI18n'
import { getFullDisplayBalance } from '../../../utils/formatBalance'

const Blablabla = styled.div`
  text-color: red;
  margin: 0px 50px;
  margin-bottom: 5px;
  text-align: center;
  line-height: 20px;
`

const GuideLink = styled.span`
  color: #0073ff;
`

interface DepositModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
}

const DepositModal: React.FC<DepositModalProps> = ({ max, onConfirm, onDismiss, tokenName = '' }) => {
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
    <Modal title={`${TranslateString(999, 'Burn')} ${tokenName} Tokens`} onDismiss={onDismiss}>
      <Blablabla >
        By entering these pools, you understand
        <br />
        and agree that 100% of your deposited MIS will be burned
        <br />
        to earn the reward tokens over the
        <br />
        remaining duration of the pool.
        </Blablabla>
      <Blablabla >
          <FaQuestionCircle/> Learn more about hades pools <a target="_blanK" rel="noreferrer" href="https://artemis-protocol.gitbook.io/artemis/the-protocol/launchpad-1/incubator"><GuideLink>here</GuideLink></a>
        </Blablabla>
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <ModalActions>
        <Button fullWidth variant="secondary" onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </Button>
        <Button
          fullWidth
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
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

export default DepositModal
