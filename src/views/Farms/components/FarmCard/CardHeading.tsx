import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image, Link } from '@pancakeswap-libs/uikit'
import { CommunityTag, CoreTag, RiskTag, NoFeeTag } from 'components/Tags'
import { FaArrowRight, FaHistory, FaLink, FaPiggyBank, FaSeedling } from 'react-icons/fa';

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
    <Wrapper justifyContent="space-between" alignItems="center" mb="10px">
      {/* <Image src={`/images/farms/${farmImage}.png`} alt={tokenSymbol} width={64} height={64} />  */}
      <Flex flexDirection="column" alignItems="start">
        <Flex justifyContent="left">
          <Link style={{color:'#646575'}} external href='https://app.farmersonly.fi/vaults/'>
            <span style={{color:'white', fontWeight:'bold', textShadow:'0px 0px 15px #FFFFF'}}>{lpLabel}</span>
          </Link>
        </Flex>
        <Flex justifyContent="left">
          <Link style={{color:'#A5A5A5'}} external href='https://app.farmersonly.fi/vaults/'>
            <span style={{color:'#A5A5A5'}}>Enter Vaults</span> 
          </Link>
        </Flex>

    {/* <Flex justifyContent="center">
          depositFee === 0 ? <NoFeeTag /> : null} 
          isCommunityFarm ? <CommunityTag /> : <CoreTag />}
          <RiskTag risk={risk} />
          <MultiplierTag variant="secondary">Allocation {multiplier}</MultiplierTag> 
        </Flex> */}
      </Flex>
      <object type="image/svg+xml" data={`/images/farm/${farmImage}.svg`} width="50px">&nbsp;</object> 

    </Wrapper>
  )
}

export default CardHeading
