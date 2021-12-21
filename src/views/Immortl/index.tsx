import React, { useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import Container from 'components/layout/Container'
import { FaProjectDiagram, FaRocket } from 'react-icons/fa'
import FlexLayout from 'components/layout/Flex'
import styled from 'styled-components'
import { TranslateString } from 'utils/translateTextHelpers'
import Page from 'components/layout/Page'
import { Alert } from 'react-bootstrap'
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
  const [modalOpen, setModalOpen] = useState(true) 
  const handleModal = async () => {
    setModalOpen(!modalOpen)
  }  

  return (
    <>
<Page>

      <SvgHero>
        <object 
          type="image/svg+xml" 
          data='/images/idoDashboard/immortl.svg'
          className="labhero"
          style={{  maxWidth:'150px', marginBottom: '0px', marginTop:'10px'}} 
          >&nbsp;
        </object>
      </SvgHero> 
      
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
