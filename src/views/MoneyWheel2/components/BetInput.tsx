import React, { useMemo, useCallback, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Skeleton, Image, Heading } from '@pancakeswap-libs/uikit'
import { provider } from 'web3-core'
import { getFullDisplayBalance } from 'utils/formatBalance'
import TokenInput from './TokenInput'
import Input, { InputProps } from '../../../components/Input'

const FlexShow = styled.div`
  display: inline;
  margin-bottom: 24px;
  margin-right: 8px;
`

interface BetInputProps extends InputProps {
    max: number | string
    symbol: string
    onSelectMax?: (evt) => void
    depositFeeBP?: number
    betNumber: string
    name?: string
  }

const BetInput: React.FC<BetInputProps> = ({ max, symbol, onChange, onSelectMax, value, name, depositFeeBP = 0, betNumber}) => {
    return (
        <FlexShow>
            <Heading as="h2" size="xl" color="secondary" mb="24px" style={{ textAlign: 'center' }}>
                {betNumber}
            </Heading>
            <TokenInput
                onChange={onChange}
                onSelectMax={onSelectMax}
                value={value}
                max={max}
                symbol={symbol}
                name={name}
            />
        </FlexShow>
        
    )
}

export default BetInput