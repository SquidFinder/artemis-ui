import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Text, Flex, Link } from '@pancakeswap-libs/uikit'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { Address } from 'config/constants/types'

export interface ExpandableSectionProps {
  isTokenOnly?: boolean
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  quoteTokenAdresses?: Address
  quoteTokenSymbol?: string
  tokenAddresses: Address
}


const Wrapper = styled.div`
  margin-top: 24px;
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  isTokenOnly,
  bscScanAddress,
  removed,
  totalValueFormated,
  lpLabel,
  quoteTokenAdresses,
  quoteTokenSymbol,
  tokenAddresses,
}) => {
  const TranslateString = useI18n()
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })

  return (
    <Wrapper>
      {!removed && (
        <Flex justifyContent="space-between">
          <span>Liquidity</span><Text>{totalValueFormated}</Text>
        </Flex>
      )}
      <Flex justifyContent="flex-start">
        <Link external href={bscScanAddress} bold={false} style={{"color": "#FFFF"}}>
          {TranslateString(999, 'LP on Explorer')}
        </Link>
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
