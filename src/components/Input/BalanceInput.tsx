import React from 'react'
import styled from 'styled-components'
import { Button } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { FaArrowRight } from 'react-icons/fa'
import Input, { InputProps } from './Input'

interface Props extends InputProps {
  max: number | string
  symbol: string
  onSelectMax?: () => void
}

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledMaxText = styled.div`
  align-items: center;
  color: #ffff;
  display: flex;
  font-size: 13px;
  font-weight: 400;
  height: 30px;
  justify-content: flex-end;
  margin-right: 5px;
`

const MaxText = styled.p`
  color: #FFFF;
  font-size: 14px;
  font-weight: 400;
  justify-content: flex-end;
  margin-right: 5px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;

`

const StyledTokenSymbol = styled.span`
  color: #2F324A;
  font-weight: 500;
`

const StyledBtn = styled.button`
  display: inline-flex;
  align-items: center;
  background-image: linear-gradient(#2F324A, #2F324A);
  border-radius: 10px;
  border: 1px solid #CECECE;
  height: 45px;
  width: 70px;
  color: #FFFF;
  font-size: 14px;
  font-weight: 400;
  padding: 15px;
  margin-top: 15px;
  margin-bottom: 10px;
  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    outline: 0;
    border-color: #FFFF;
    cursor: pointer;
    text-shadow: 0px 0px 5px #ccc;
  }
  `

const BalanceInput: React.FC<Props> = ({ max, symbol, onChange, onSelectMax, value }) => {
  const TranslateString = useI18n()

  return (
    <div>
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <StyledSpacer />
            <div>
              <StyledBtn style={{justifyContent:'center'}} onClick={onSelectMax}>
                {TranslateString(452, 'Max')}
              </StyledBtn>
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />
      <a href="https://app.sushi.com/swap?outputCurrency=0xcf664087a5bb0237a0bad6742852ec6c8d69a27a">
        <MaxText>
          {TranslateString(999, `${max.toLocaleString()} ${symbol} Available`)}&nbsp;({`Get ${symbol}`})
        </MaxText>
      </a>
    </div>
  )
}

export default BalanceInput
