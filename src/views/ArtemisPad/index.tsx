import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import Container from 'components/layout/Container'
import { FaProjectDiagram, FaRocket } from 'react-icons/fa'
import FlexLayout from 'components/layout/Flex'
import styled from 'styled-components'
import { TranslateString } from 'utils/translateTextHelpers'
import Page from 'components/layout/Page'
import IfoTabButtons from './components/IfoTabButtons'
import CurrentIfo from './CurrentIfo'
import PastIfo from './PastIfo'

const SvgHero = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  @media all and (max-width: 1350px) { 
    max-width: 100%;
  }
`

const Ifos = () => {
  const { path } = useRouteMatch()

  return (
    <>
      <SvgHero>
        <object 
          type="image/svg+xml" 
          data='/images/idoHero/lumen.svg'
          className="labhero"
          style={{  maxWidth:'220px', marginBottom: '10px', marginTop:'10px'}} 
          >&nbsp;
        </object>
      </SvgHero> 
      <Page>
        <Route exact path={`${path}`}>
          <CurrentIfo />
        </Route>
        <Route path={`${path}/history`}>
          <PastIfo />
        </Route>
        {/* 
        <FlexLayout style={{marginTop:'20px'}}>
          <Feature>
            <IfoTabButtons/>
          </Feature>
        </FlexLayout> 
        */}
      </Page>
    </>
  )
}

export default Ifos
