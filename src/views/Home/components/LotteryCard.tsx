import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, useModal, LinkExternal } from '@pancakeswap-libs/uikit'
import { getCakeAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import useTokenBalance from 'hooks/useTokenBalance'
import { useMultiClaimLottery } from 'hooks/useBuyLottery'
import { useTotalClaim } from 'hooks/useTickets'
import { FaBroadcastTower, FaExchangeAlt, FaScroll, FaTicketAlt } from 'react-icons/fa'
import BuyModal from 'views/Lottery/components/TicketCard/BuyTicketModal'
import CakeWinnings from './CakeWinnings'
import LotteryJackpot from './LotteryJackpot'

const StyledLotteryCard = styled(Card)`
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 300px;
  min-width: 250px;

  margin-left: auto;
  margin-right: auto;
  border-radius: 14px;
`
// background-image: url('/images/ticket-bg.svg'); ^^^
const Divider = styled.div`
background-color: #FAFAFA;
height: 3px;
margin-left: auto;
margin-right: auto;
margin-top: 20px;
margin-bottom: 20px;
width: 100%;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Title = styled.p`
  font-size: 1.4em;
  margin-bottom: 21px;

`

const Actions = styled.div`
  display: flex;
  margin-top: 24px;
  button {
    flex: 1 0 50%;
  }
`

const FarmedStakingCard = () => {
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const [requesteClaim, setRequestedClaim] = useState(false)
  const TranslateString = useI18n()
  const { claimAmount } = useTotalClaim()
  const { onMultiClaim } = useMultiClaimLottery()
  const cakeBalance = useTokenBalance(getCakeAddress())

  const handleClaim = useCallback(async () => {
    try {
      setRequestedClaim(true)
      const txHash = await onMultiClaim()
      // user rejected tx or didn't go thru
      if (txHash) {
        setRequestedClaim(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onMultiClaim, setRequestedClaim])

  const [onPresentBuy] = useModal(<BuyModal max={cakeBalance} tokenName="CAKE" />)

  return (
    <StyledLotteryCard>
      <CardBody>
        <Title>
          <span><FaBroadcastTower/> Bridge</span>
        </Title>

        <Block>
          <LinkExternal fontSize='14px' href='https://bridge.harmony.one/erc20'>{TranslateString(999, 'Horizon Bridge')}</LinkExternal>
        </Block>

        <Block>
          <LinkExternal fontSize='14px' href='https://bridge.terra.money/'>{TranslateString(999, 'Terra Bridge')}</LinkExternal>
        </Block>

        <Divider />

        <Title>
          <span><FaExchangeAlt/> Swap</span>
        </Title>

        <Block>
          <LinkExternal fontSize='14px' href='https://app.defikingdoms.com/#/marketplace?outputCurrency=0xd74433b187cf0ba998ad9be3486b929c76815215'>{TranslateString(999, 'Defi Kingdoms')}</LinkExternal>
        </Block>

        <Block>
          <LinkExternal fontSize='14px' href='https://app.defikingdoms.com/#/add/ONE'>{TranslateString(999, 'Add Liquidity')}</LinkExternal>
        </Block>


      </CardBody>
    </StyledLotteryCard>
  )
}

export default FarmedStakingCard
