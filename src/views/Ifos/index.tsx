import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import Container from 'components/layout/Container'
import { FaProjectDiagram, FaRocket } from 'react-icons/fa'
import FlexLayout from 'components/layout/Flex'
import styled from 'styled-components'
import { TranslateString } from 'utils/translateTextHelpers'
import IfoTabButtons from './components/IfoTabButtons'
import Hero from './components/Hero'
import CurrentIfo from './CurrentIfo'
import PastIfo from './PastIfo'

const Feature = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  font-size: 1.1em !important;
  max-width: 180px;
  text-align: center;


  @media screen and (max-width: 680px){
    max-width: 64%;
    flex-flow: row;
    align-items: flex-start;
    & > svg{
      width: 42px;
    }
    & > p{
      text-align: left;
      margin-left: 15px;
    }
  
`

const SvgHero = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Sub = styled.p`
  font-size: 20px;
  color: #ffff;
  margin-top: 0px;
  margin-bottom: 30px;
  margin-top: 20px;
  text-shadow: 0px 0px 5px #fff;`

const Ifos = () => {
  const { path } = useRouteMatch()

  return (
    <>
      {/* <Hero/> */ }

      <StyledNotFound>
        <Sub>{TranslateString(999, 'Upcoming IDOs...')}</Sub>
      </StyledNotFound>

      <SvgHero>
        <object 
          type="image/svg+xml" 
          data='/images/comingIDO/coming.svg'
          className="labhero"
          style={{  maxWidth:'300px', marginBottom: '20px'}} 
          >&nbsp;</object>
      </SvgHero>

      <Container>
        <Route exact path={`${path}`}>
          <CurrentIfo />
        </Route>
        <Route path={`${path}/history`}>
          <PastIfo />
        </Route>

        <FlexLayout style={{marginTop:'20px'}}>
          <Feature >
            <IfoTabButtons />
          </Feature>
        </FlexLayout>

      </Container>
    </>
  )
}

export default Ifos
