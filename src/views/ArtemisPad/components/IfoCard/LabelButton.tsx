import React, { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'
import { Button, Text } from '@pancakeswap-libs/uikit'
import { FaBorderAll } from 'react-icons/fa'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  label?: string
  buttonLabel: string
  disabled?: boolean
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 2px;
  border-radius: 12px;
  border-color: #fff;
  padding-left: 16px;

`
const Txt = styled.p`
  color: #D4D4D4;
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 0px;
  margin-top: 2px;
  text-shadow: 0px 0px 0px #D4D4D4;
`


const LabelButton: React.FC<Props> = ({ value, label, buttonLabel, onClick, disabled = false }) => {
  return (
    <div>
      {label && (
        <Text fontSize="14px" color="textSubtle">
          {label}
        </Text>
      )}
      <ButtonWrapper>
        <Txt>
          {value}
        </Txt>
        <Button onClick={onClick} disabled={disabled} 
          style={{
            color:'#fff', 
            background:'#2F324A', 
            fontSize:'13px',
            boxShadow:'0px 0px 3px #fff',
            height:'40px',
            width:'100px',
            fontWeight:'normal',
            }}>
          {buttonLabel}
        </Button>
      </ButtonWrapper>
    </div>
  )
}

export default LabelButton
