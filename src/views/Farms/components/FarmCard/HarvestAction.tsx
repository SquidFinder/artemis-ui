import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import labo from 'config/constants/labo'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import styled from 'styled-components'
import useStake from '../../../../hooks/useStake'
import {usePriceCakeBusd} from "../../../../state/hooks";

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const Staked = styled.div`
  font-size: 10px;
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  margin-top: 3px;
  justify-content: flex-end;
`

const USDStaked = styled.text`
  font-size: 13px;
  align-items: center;
  color: #8E8E8E;
  display: flex;
  margin-top: 3px;
  justify-content: flex-start;
`

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

const StyledBtn = styled.button`
  align-items: center;
  background-image: linear-gradient(#2F324A, #2F324A);

  border:1px solid #CECECE;
  border-color: #FFFF;
  border-radius: 10px;

  color: #FFFF;
  font-size: 13px;
  font-weight: 300;
  display: inline-flex;

  height: 11px;
  width: 80px;
  padding: 17px;
  box-shadow: 0px 0px 0px #ccc;
  text-shadow: 0px 0px 10px #ccc;

  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    outline: 0;
    border-color: #FFFF;
    cursor: pointer;
    box-shadow: 0px 0px 5px #fff;

  }
`

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const { onStake } = useStake(pid)
  const cakePrice = usePriceCakeBusd()
  const Earned = new BigNumber(getBalanceNumber(earnings))
  const rawEarningsBalance = getBalanceNumber(earnings)
  const displayBalance = rawEarningsBalance.toLocaleString('en-us',{ maximumFractionDigits: 1, minimumFractionDigits: 1 })
  const rawEarningsUsdBalance = getBalanceNumber(earnings.times(cakePrice), )
  const displayBalanceUsd = rawEarningsUsdBalance.toLocaleString('en-us',{ maximumFractionDigits: 2, minimumFractionDigits: 2 })

  return (
    <Flex mb='6px' justifyContent='space-between' alignItems='center'>

      <Heading style={{fontSize:'15px'}} color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>
        <Staked style={{ textShadow:'0px 0px 0px #fff'}}>{displayBalance} MIS</Staked>
        <USDStaked>Earned</USDStaked>
        {/* {earnings.gt(0) && <USDStaked>${displayBalanceUsd}</USDStaked>} */ }
      </Heading>

      <BalanceAndCompound>
        {pid === labo.pids.pidLabo ?
          <Button
            disabled={rawEarningsBalance === 0 || pendingTx}
            size='sm'
            variant='secondary'
            marginBottom='15px'
            onClick={async () => {
              setPendingTx(true)
              await onStake(rawEarningsBalance.toString())
              setPendingTx(false)
            }}
            style={{
              'borderRadius': '5px',
              'height': '40px',
              'width': '103px',
              'marginRight': '1px'
            }}
          >
            {TranslateString(999, 'Compound')}
          </Button>
          : null}
        {/* {Earned.gt(0) &&  */ }
        <StyledBtn
          disabled={rawEarningsBalance === 0 || pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onReward()
            setPendingTx(false)
          }}        
          style={{ justifyContent:"center" }}
        >
          {TranslateString(999, 'Claim')}
        </StyledBtn>
      </BalanceAndCompound>


    </Flex>
  )
}

export default HarvestAction
