import React, {useState} from 'react'
import styled from 'styled-components'
import { BaseLayout, Card, CardBody, Link, LinkExternal  } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import Page from 'components/layout/Page'
import useTokenBalance from 'hooks/useTokenBalance'
import { FaUserCheck, FaLock, FaHistory, FaScroll, FaMonument, FaCloud, FaFire, FaMapMarkedAlt, FaMap } from 'react-icons/fa';
import HomePage from 'components/layout/HomePage'
import { getCakeAddress, getOneAddress } from '../../utils/addressHelpers'


const Divider = styled.div`
background-color: #FAFAFA;
height: 3px;
margin-left: auto;
margin-right: auto;
margin-top: 30px;
margin-bottom: 5px;
width: 100%;
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
  
  return (
    <Page>



    <StyledCakeStats style={{"boxShadow":"0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)"}}>
      <CardBody>
        
    <div>
    <SvgHero>
      <object type="image/svg+xml" data="images/artemisearn.svg" width="600px">&nbsp;</object>
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