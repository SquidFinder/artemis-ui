import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text, LogoIcon } from '@pancakeswap-libs/uikit'
import { FaBuilding, FaProjectDiagram, FaRocket, FaTools } from 'react-icons/fa'

import Page from 'components/layout/Page'
import useI18n from 'hooks/useI18n'

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
  margin-bottom: 100px;
  margin-top: 0px;
  text-shadow: 0px 0px 0px #fff;
`
const SvgHero = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const NotFound = () => {
  const TranslateString = useI18n()

  return (
    <Page>

    <StyledNotFound>
        <Sub>{TranslateString(999, 'Undergoing Maintenance...')} <FaTools/></Sub>
      </StyledNotFound>

    </Page>
  )
}

export default NotFound
