import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Switch from "react-switch";
import { FaQuestionCircle } from 'react-icons/fa'

const Divider = styled.div`
background-color: #4c68ef;
height: 3px;
margin-left: auto;
margin-right: auto;
margin-top: 20px;
margin-bottom: 25px;
width: 30%;

`

const FarmTabButtons = ({ stakedOnly, setStakedOnly, tokenMode }) => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()


  return (
    <Wrapper>
      <Divider />
      <ActionsWrapper>
        {/*
        <ToggleWrapper>
          <Switch checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} onColor='#fff' />
        <Text> {TranslateString(699, 'Staked Only')}</Text>
        </ToggleWrapper>
        */}

        
        { !tokenMode ?
        <Blablabla >
          <FaQuestionCircle/> First time? Read our <a target="_blanK" rel="noreferrer" href="https://artemis-protocol.gitbook.io/artemis/"><GuideLink>guide</GuideLink></a>
        </Blablabla>
       : 
       "" 
       }

        <ButtonMenu activeIndex={isExact ? 0 : 1} size="sm" >
          <ButtonMenuItem as={Link} to={`${url}`} >
            {TranslateString(698, 'Active')}
          </ButtonMenuItem>
          <ButtonMenuItem as={Link} to={`${url}/history`}>
            {TranslateString(700, 'Inactive')}
          </ButtonMenuItem>
        </ButtonMenu>
      </ActionsWrapper>

    </Wrapper>
  )
}

export default FarmTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin-bottom: 25px;
  
`

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
  @media all and (max-width: 480px) {
      flex-flow: column;
  }
  
  
`
const Blablabla = styled.div`
  text-color: red;
  margin: 0px 18px;
`
const GuideLink = styled.span`
  color: #0073ff;
`

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 32px;
  @media all and (max-width: 480px) {
    margin-bottom: 21px;
}
  


  ${Text} {
    margin-left: 8px;
  }
`