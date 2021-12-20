import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Card, CardBody, CardRibbon } from '@pancakeswap-libs/uikit'
import { BSC_BLOCK_TIME } from 'config'
import { Ifo, IfoStatus } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { useIfoContract } from 'hooks/useContract'
import UnlockButton from 'components/UnlockButton'
import IfoCardHeader from './IfoCardHeader'
import IfoCardProgress from './IfoCardProgress'
import IfoCardDescription from './IfoCardDescription'
import IfoCardDetails from './IfoCardDetails'
import IfoCardTime from './IfoCardTime'
import IfoCardContribute from './IfoCardContribute'

export interface IfoCardProps {
  ifo: Ifo
}

const StyledIfoCard = styled(Card)<{ ifoId: string }>`
  align-self: baseline;
  background: #33364D;
  border-radius: 20px;
  border: 2px solid #CECECE;
  display: flex;
  background-repeat: no-repeat;
  flex-direction: column;
  background-size: contain;
  justify-content: space-around;
  padding: 0px;
  position: relative;
  box-shadow: 0px 0px 4px #ccc;
  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    outline: 0;
    border-color: #FFFF;
    box-shadow: 0px 0px 3px #cccc;
  }
`


const Column = styled.div`
  margin-top: 10px;
  align-items: center;

`

const getStatus = (currentBlock: number, startBlock: number, endBlock: number): IfoStatus | null => {
  if (currentBlock < startBlock) {
    return 'coming_soon'
  }

  if (currentBlock >= startBlock && currentBlock <= endBlock) {
    return 'live'
  }

  if (currentBlock > endBlock) {
    return 'finished'
  }

  return null
}

const getRibbonComponent = (status: IfoStatus, TranslateString: (translationId: number, fallback: string) => any) => {
  // eslint-disable-next-line no-lone-blocks
  { /* if (status === 'coming_soon') {
    return <CardRibbon variantColor="textDisabled" text={TranslateString(999, 'Coming Soon')} />
  } */ }

  return null
}

const IfoCard: React.FC<IfoCardProps> = ({ ifo }) => {
  const {
    id,
    address,
    name,
    subTitle,
    description,
    launchDate,
    launchTime,
    endDate,
    endTime,
    saleAmount,
    raiseAmount,
    cakeToBurn,
    projectSiteUrl,
    currency,
    currencyAddress,
    tokenDecimals,
    releaseBlockNumber,
    misAmount,
    tier,
    collatAddr,
  } = ifo
  const [state, setState] = useState({
    isLoading: true,
    status: null,
    blocksRemaining: 0,
    secondsUntilStart: 0,
    progress: 0,
    secondsUntilEnd: 0,
    raisingAmount: new BigNumber(0),
    totalAmount: new BigNumber(0),
    startBlockNum: 0,
    endBlockNum: 0,
  })
  const { account } = useWallet()
  const contract = useIfoContract(address)

  const currentBlock = useBlock()
  const TranslateString = useI18n()

  const Ribbon = getRibbonComponent(state.status, TranslateString)

  useEffect(() => {
    const fetchProgress = async () => {
      const [startBlock, endBlock, raisingAmount, totalAmount] = await Promise.all([
        contract.methods.startBlock().call(),
        contract.methods.endBlock().call(),
        contract.methods.raisingAmount().call(),
        contract.methods.totalAmount().call(),
      ])

      const startBlockNum = parseInt(startBlock, 10)
      const endBlockNum = parseInt(endBlock, 10)

      const status = getStatus(currentBlock, startBlockNum, endBlockNum)
      const totalBlocks = endBlockNum - startBlockNum
      const blocksRemaining = endBlockNum - currentBlock

      // Calculate the total progress until finished or until start
      const progress =
        currentBlock > startBlockNum
          ? ((currentBlock - startBlockNum) / totalBlocks) * 100
          : ((currentBlock - releaseBlockNumber) / (startBlockNum - releaseBlockNumber)) * 100

      setState({
        isLoading: false,
        secondsUntilEnd: blocksRemaining * BSC_BLOCK_TIME,
        secondsUntilStart: (startBlockNum - currentBlock) * BSC_BLOCK_TIME,
        raisingAmount: new BigNumber(raisingAmount),
        totalAmount: new BigNumber(totalAmount),
        status,
        progress,
        blocksRemaining,
        startBlockNum,
        endBlockNum,
      })
    }

    fetchProgress()
  }, [currentBlock, contract, releaseBlockNumber, setState])

  const isActive = state.status === 'live'
  const isFinished = state.status === 'finished'

  return (
    <StyledIfoCard ifoId={id} ribbon={Ribbon} isActive={isActive}>
      <CardBody>

        <Column>
          {/* <IfoCardHeader ifoId={id} name={name} subTitle={subTitle} projectSiteUrl={projectSiteUrl} /> */ }
          <IfoCardProgress progress={state.progress} launchDate={launchDate} launchTime={launchTime} endDate={endDate} endTime={endTime} />
          <IfoCardTime
            isLoading={state.isLoading}
            status={state.status}
            secondsUntilStart={state.secondsUntilStart}
            secondsUntilEnd={state.secondsUntilEnd}
            block={isActive || isFinished ? state.endBlockNum : state.startBlockNum}
            address={address}/>
        </Column>
        
        <IfoCardDescription description={description} />
        <IfoCardDetails
          saleAmount={saleAmount}
          raiseAmount={raiseAmount}
          cakeToBurn={cakeToBurn}
          raisingAmount={state.raisingAmount}
          totalAmount={state.totalAmount}
          misAmount={misAmount}
          tier={tier}
        />
        {/* {!account && <UnlockButton fullWidth />} */ }
        {(isActive || isFinished) && (
          <IfoCardContribute
            address={address}
            currency={currency}
            currencyAddress={currencyAddress}
            collatAddr={collatAddr}
            contract={contract}
            status={state.status}
            totalAmount={state.totalAmount}

            raisingAmount={state.raisingAmount}
            tokenDecimals={tokenDecimals} 
            misAmount={misAmount}        
            />
        )}
      </CardBody>
    </StyledIfoCard>
  )
}

export default IfoCard
