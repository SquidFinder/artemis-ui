import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import { BaseLayout, Button, Card, CardBody, Link, LinkExternal  } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import Page from 'components/layout/Page'
import useTokenBalance from 'hooks/useTokenBalance'
import { FaUserCheck, FaLock, FaHistory, FaScroll, FaMonument, FaCloud, FaFire, FaMapMarkedAlt, FaMap, FaUserClock } from 'react-icons/fa';
import HomePage from 'components/layout/HomePage'
import { usePriceCakeBusd } from 'state/hooks'
import { useAllHarvest } from 'hooks/useHarvest'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import CakeHarvestBalance from 'views/Home/components/CakeHarvestBalance'
import UnlockButton from 'components/UnlockButton'
import CakeWalletBalance from 'views/Home/components/CakeWalletBalance'
import { getCakeAddress, getOneAddress } from '../../utils/addressHelpers'

const Price = styled.button`
-webkit-box-align: center;
align-items: center;
background-color: rgba(0, 0, 0,0) !important;
border: 1px;
border-style: solid !important;
border-color: #405fb4 !important;
border-radius: 16px;
color: #405fb4;
font-size: 15px;
font-weight: 800;
width: 100%;
display: inline-flex;
min-height: 21px;
max-height: 37px;
letter-spacing: 0.03em;
padding: 15px;
`

const Divider = styled.div`
background-color: #FAFAFA;
height: 3px;
margin-left: auto;
margin-right: auto;
margin-top: 30px;
margin-bottom: 5px;
width: 100%;
`

const StyledFarmStakingCard = styled(Card)`
  background-repeat: no-repeat;
  background-position: top right;
  border-radius: 14px;
`

const Block = styled.div`
  margin-bottom: 5px;
`

const CardImage = styled.img`
  margin-bottom: 5px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 12px !important;
`

const Actions = styled.div`
  margin-top: 12px;
`

const FlowCol = styled.div`
  display: flex;
  flex-flow: column;
`

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  border-radius: 14px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`

const Title = styled.p`
  font-size: 1.4em;
  margin-bottom: 21px;

`
const Sub = styled.p`
  font-size: 0.97em;
  color: #7D7D7D;
`

const Sub2 = styled.p`
  margin-top: 20px;
  font-size: 0.97em;
  color: #7D7D7D;
`

const Wrapper = styled.div`
  margin-left: 12px;
  margin-right: 12px;
`

const FlowRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media all and (max-width: 1000px) { 
    flex-flow: column;
    align-items: center;
    padding-bottom: 21px;
  }

  @media all and (min-width: 1000px) {
    flex-flow: row-reverse;
    justify-content: center;
   }



  //ADD SPACE BETWEENS
`

const Cards = styled(BaseLayout)`

  & > div {
    grid-column: span 10;
    width: 118%;
    height: 100%;


  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 10;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 10;
    }
  }
`

const SvgHero = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  padding: 42px 12px;

  @media all and (max-width: 1350px) { 
    max-width: 100%;
  }
`
  
const MoneyWheel: React.FC = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const eggPrice = usePriceCakeBusd().toNumber()
  const earningsSum = farmsWithBalance.reduce((accum, farm) => {
    return accum + new BigNumber(farm.balance).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])


  return (
    <Page>





    <StyledCakeStats style={{"boxShadow":"0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)"}}>
      <CardBody>
      
    <div>
    <SvgHero>
      <object type="image/svg+xml" data="images/artemisearn.svg" width="600px">&nbsp;</object>
      <CardBody>

          <FlowCol>
         

                  <Sub className="nav-links connect">
                  { account != null && account.length > 1? 
                    <Price>User: {account.substring(0,8).concat("...")} <p style={{'color': '#4c68ef'}}> ✓</p></Price>:
                  <UnlockButton style={{
                    backgroundColor: 'rgb(22, 35, 73) !important',
                    border: '0px',
                    color: '#8299dd !important',
                    borderRadius: '15px',
                    fontSize: '15px',
                    fontWeight: '800',
                    width: '100%',
                    display: 'inline-flex',
                    letterSpacing: '0.03em',
                    padding: '15px',
                    flexFlow: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    'minHeight':'21px',
                    'maxHeight':'37px'
                  }}>Connect</UnlockButton>
                  }
                  </Sub>



            <div style={{'display':'inline-block', 'paddingLeft': '15px', 'lineHeight': '19px', 'marginBottom': '5px', 'marginTop': '20px'}}>
                <Block>
                  <CakeHarvestBalance earningsSum={earningsSum}/>
                  {account ? (
                    <div>
                      <Label>~${(eggPrice * earningsSum).toFixed(2)}</Label>
                      <Sub>MIS to Settle</Sub>
                    </div>
                  ):(<Sub>MIS to Settle</Sub>)
                  }
                  
                </Block>
            </div>
            <div style={{'display':'inline-block', 'paddingLeft': '15px', 'lineHeight': '19px', 'marginBottom': '5px'}}>
                <Block>
                  <CakeWalletBalance cakeBalance={cakeBalance} />
                  {account ? (
                    <div>
                      <Label>~${(eggPrice * cakeBalance).toFixed(2)}</Label>
                      <Sub>MIS in Wallet</Sub>
                    </div>
                  ):(<Sub>MIS in Wallet</Sub>)
                  }
                </Block>
            </div>
          </FlowCol>
          </CardBody>

    </SvgHero>
    </div>
        <Wrapper>


        <Title>
          <span><FaMap/> Explore Artemis Earn</span>
        </Title>

          <Row>
          <LinkExternal href="/elysium" >Elysium Pools</LinkExternal>
          <Sub className="lightColor">Deposit Liquidity Provider tokens to earn MIS</Sub>
          </Row>

          <Row style={{'marginBottom': '0 !important'}}>

          <LinkExternal href="/hades" >Hades Pools</LinkExternal>

            <Sub className="lightColor">Burn MIS and earn tokens over a set period of time</Sub>
          </Row>




        </Wrapper>
      </CardBody>




        
        
 

    </StyledCakeStats>



    </Page>



  )
}

export default MoneyWheel