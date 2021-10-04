import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js/bignumber'
import { Button } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Input, { InputProps } from 'components/Input'

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  onSelectMax?: (evt) => void
  depositFeeBP?: number
  name?: string
}

const TokenInput: React.FC<TokenInputProps> = ({ max, symbol, onChange, onSelectMax, value, name, depositFeeBP = 0 }) => {
  const TranslateString = useI18n()
  return (
    <StyledTokenInput>
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper>
            {/* <StyledTokenSymbol>{symbol}</StyledTokenSymbol> */}
            <StyledSpacer />
            <div>
              <Button size="sm" onClick={onSelectMax} name={name}>
                {TranslateString(452, 'Max')}
              </Button>
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />
      {depositFeeBP > 0 ? (
        <StyledMaxText>
          {TranslateString(10001, 'Deposit Fee')}: {new BigNumber(value || 0).times(depositFeeBP / 10000).toString()}{' '}
        </StyledMaxText>
      ) : null}
    </StyledTokenInput>
  )
}

const StyledTokenInput = styled.div``

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
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
  font-weight: 700;
  height: 44px;
  justify-content: flex-end;
`

const StyledTokenSymbol = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 700;
`

export default TokenInput