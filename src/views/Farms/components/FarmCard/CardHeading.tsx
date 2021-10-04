import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image } from '@pancakeswap-libs/uikit'
import { CommunityTag, CoreTag, RiskTag, NoFeeTag } from 'components/Tags'
import { FaSeedling } from 'react-icons/fa';

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  risk?: number
  depositFee?: number
  farmImage?: string
  tokenSymbol?: string
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 0.25rem;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 3px;
  background-color: rgba(0,0,0,0);
  border-color: #6E4EED
  size: 1px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  risk,
  farmImage,
  tokenSymbol,
  depositFee,
}) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="20px">
      {/* <Image src={`/images/farms/${farmImage}.png`} alt={tokenSymbol} width={64} height={64} /> */}
      <object type="image/svg+xml" data={`/images/farms/${farmImage}.svg`} width="85px">&nbsp;</object>

      <Flex flexDirection="column" alignItems="flex-end">

        <Heading size="md" mb="8px" marginRight="2px"><FaSeedling/>{lpLabel}</Heading>

        <Flex justifyContent="center">
          {/* {depositFee === 0 ? <NoFeeTag /> : null} */}
          {/* isCommunityFarm ? <CommunityTag /> : <CoreTag />} */}
          {/* <RiskTag risk={risk} /> */}
          <MultiplierTag variant="secondary">Allocation {multiplier}</MultiplierTag>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
