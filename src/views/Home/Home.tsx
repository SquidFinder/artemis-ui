import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout, Alert } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import HomePage from 'components/layout/HomePage'
import labo from 'config/constants/labo'
import FarmStakingCard from './components/FarmStakingCard'
import CakeStats from './components/CakeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
import TwitterCard from './components/TwitterCard'
import FarmedStakingCard from './components/LotteryCard'

const Column = styled.div`
  column-count: 2;
  height: 100%;
  column-gap: 20px;
  
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
const Hero = styled.div`
  @media all and (min-width: 1200px) {
    padding: 0px 12px 20px 0;
   }

  @media all and (max-width: 1200px) { 
    padding: 0 12px 47px 12px;
    display: flex;
    justify-content: center;
    max-width: 90%
  }
  
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <div>
      <HomePage>

        <Hero>
          <object type="image/svg+xml" data="images/banner.svg" className="labhero">&nbsp;</object>
        </Hero>

        <FlowRow>

        <Hero>
          <object type="image/svg+xml" data="images/Nan.svg" className="labhero">&nbsp;</object>
        </Hero>

          <Cards className="CardsLayout">
              <FarmStakingCard/>    
          </Cards>

          <Cards className="CardsLayout">
            <CakeStats />    
          </Cards>
        </FlowRow>

      </HomePage>
  </div>
  )
}

export default Home
