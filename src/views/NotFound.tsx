import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text, LogoIcon } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import useI18n from 'hooks/useI18n'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`
const Sub = styled.p`
  font-size: 50px;
  color: #ffff;
  margin-top: 0px;
  margin-bottom: 180px;
  text-shadow: 0px 0px 5px #fff;
`

const NotFound = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <StyledNotFound>
        <Sub >{TranslateString(999, '404')}</Sub>
      </StyledNotFound>
    </Page>
  )
}

export default NotFound
