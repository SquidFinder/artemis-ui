import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js/bignumber'
import { Button } from '@pancakeswap-libs/uikit'
import useI18n from '../../hooks/useI18n'
import Input, { InputProps } from '../Input'

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  onSelectMax?: () => void
  depositFeeBP?: number
  valueUsd?: number | string
}

const MaxBTN = styled.button`
  display: inline-flex;
  align-items: center;
  background-image: linear-gradient(#2F324A, #2F324A);
  border-radius: 10px;
  border: 1px solid #CECECE;
  height: 50px;
  width: 80px;
  color: #FFFF;
  font-size: 15px;
  font-weight: 400;
  padding: 15px;
  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    outline: 0;
    border-color: #FFFF;
    cursor: pointer;

  }
  `


const TokenInput: React.FC<TokenInputProps> = (
    { max, symbol, onChange, onSelectMax, value, depositFeeBP = 0, valueUsd= 0 }) => {
  const TranslateString = useI18n()
  const MaxTokens = new BigNumber(max).toNumber().toLocaleString('en-us', { maximumFractionDigits: 5, minimumFractionDigits: 2 });


  return (
    <StyledTokenInput>
      <StyledMaxText>
        {MaxTokens}... {symbol} Available
      </StyledMaxText>
        <Staked>
          {/* ~${valueUsd.toLocaleString()} TODO-center this somehow */}
      </Staked>
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper >
            <StyledTokenSymbol style={{"color": "#ffff "}}>{symbol}</StyledTokenSymbol>
            <StyledSpacer />
            <div>
              <MaxBTN style={{justifyContent:'center'}} onClick={onSelectMax}>
                {TranslateString(452, 'Max')}
              </MaxBTN>
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />
      {
        depositFeeBP > 0 ?
          <StyledMaxText>
            {TranslateString(10001, 'Deposit Fee')}: {new BigNumber(value || 0).times(depositFeeBP/10000).toString()} {symbol}
          </StyledMaxText>
          :
          null
      }

    </StyledTokenInput>
  )
}

const StyledTokenInput = styled.div`
background-color: #2F324A;

`


const StyledSpacer = styled.div`
background-color: #2F324A;

  width: ${(props) => props.theme.spacing[3]}px;
`

const Staked = styled.div`
background-color: #2F324A;

  font-size: 10px;
  color: ${({ theme }) => theme.colors.textSubtle};
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledMaxText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  font-size: 14px;
  font-weight: 500;
  height: 44px;
  justify-content: flex-end;
`

const StyledTokenSymbol = styled.span`

  color: ${(props) => props.theme.colors.primary};
  font-weight: 700;
`

export default TokenInput
