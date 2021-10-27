import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, useModal, LinkExternal, Link } from '@pancakeswap-libs/uikit'
import { getCakeAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import useTokenBalance from 'hooks/useTokenBalance'
import { useMultiClaimLottery } from 'hooks/useBuyLottery'
import { useTotalClaim } from 'hooks/useTickets'
import { FaArrowRight, FaBroadcastTower, FaChartBar, FaExchangeAlt, FaScroll, FaTicketAlt, FaVoteYea } from 'react-icons/fa'
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

const Divider2 = styled.div`
background-color: #FAFAFA;
height: 3px;
margin-left: auto;
margin-right: auto;
margin-top: 10px;
margin-bottom: 10px;
width: 0%;
`

const Block = styled.div`
  margin-bottom: 5px;
  margin-top: 5px;
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

const DCard = styled.div`
  background: #3E4266;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  position: relative;
  text-align: center;
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

        <DCard>

        <Block>
          <Link style={{color:'white'}} fontSize='14px' href='https://bridge.harmony.one/erc20'>{TranslateString(999, 'Horizon Bridge')}<FaArrowRight/></Link>
        </Block>

        <Block>
          <Link style={{color:'white'}} fontSize='14px' href='https://bridge.terra.money/'>{TranslateString(999, 'Terra Bridge')}<FaArrowRight/></Link>
        </Block>

        </DCard>

        <Divider2 />

        <Title>
          <span><FaVoteYea /> Misc</span>
        </Title>

        <DCard>
          <Block>
          <Link style={{color:'white'}} fontSize='14px' href='https://gov.harmony.one/#/artemis'>Governance <FaArrowRight/></Link>
          </Block>
          <Block>
          <Link style={{color:'white'}}fontSize='14px'  href='https://artemischarts.northeurope.cloudapp.azure.com/'>Charts <FaArrowRight/></Link>
          </Block>

        </DCard>





      </CardBody>
    </StyledLotteryCard>
  )
}

export default FarmedStakingCard
