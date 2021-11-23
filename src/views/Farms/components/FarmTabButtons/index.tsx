import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Switch from "react-switch";
import { FaQuestionCircle } from 'react-icons/fa'

const StyledButton = styled.div`
  -webkit-box-align: center;
  align-items: center;
  background-image: linear-gradient(#2F324A, #2F324A);
  background: #2F324A;
  border-radius: 15px;
  border:1px solid #CECECE;
  border-color: #ffff !important;
  border-radius: 10px;
  color: #FFFF;
  font-size: 13px;
  font-weight: 300;
  display: inline-flex;
  height: 11px;
  width: 70px;
  padding: 14px;
  box-shadow: 0px 0px 3px #ccc;
  text-shadow: 0px 0px 0px #ccc;
`

const CheckBoxWrapper = styled.div`
  position: relative;`

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 10px;
  cursor: pointer;
  border: 1px;
  border-style: solid !important;
  border-color: #FFFF !important;
  box-shadow: 0px 0px 3px #FFF;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }`

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 10px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 19px;
      transition: 0.2s;
    }
  }
`

const FarmTabButtons = ({ stakedOnly, setStakedOnly, tokenMode }) => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <ActionsWrapper style={{ marginTop: '20px', alignItems:'center'}}>

         { /* <ToggleWrapper>
          <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} onColor='#fff' />
            <Text> {TranslateString(699, 'Staked Only')}</Text>
         </ToggleWrapper>  */ }

        <CheckBoxWrapper style={{marginRight:'5px'}}>
          <CheckBox id="checkbox" type="checkbox" checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)}/>
          <CheckBoxLabel htmlFor="checkbox" />
        </CheckBoxWrapper>

        <ButtonMenu   activeIndex={isExact ? 0 : 1} size="sm" >
          <StyledButton style={{justifyContent:'center'}} as={Link} to={`${url}`} >
            {TranslateString(8, 'Active')}
          </StyledButton>
          <StyledButton style={{justifyContent:'center'}} as={Link} to={`${url}/history`}>
            {TranslateString(7, 'Inactive')}
          </StyledButton>
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