import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Flex } from '@pancakeswap-libs/uikit'
import { Farm } from 'state/types'
import { provider } from 'web3-core'
import useI18n from 'hooks/useI18n'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { PoolCategory, QuoteToken } from 'config/constants/types'
import styled from 'styled-components'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import {getTotalValueFromQuoteTokens, usePrices} from "../../../../state/hooks";

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

const FCard = styled.div`
  align-self: baseline;
  background-image: linear-gradient(#2F324A, #33364D);
  border-radius: 20px;
  border: 2px solid #CECECE;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 25px;
  position: relative;
  text-align: center;
  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    outline: 0;
    border-color: #FFFF;
    box-shadow: 0px 0px 3px #cccc;
  }
`

const Quote = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  text-shadow: 0px 0px 5px #ccc;
`

const LightText = styled.p`
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 0px;
  text-shadow: 0px 0px 0px #ccc;
  color: #8E8E8E; 
  }
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  cakePrice?: BigNumber
  bnbPrice?: BigNumber
  ethereum?: provider
  account?: string
  poolCategory?: PoolCategory

}

const FarmCard: React.FC<FarmCardProps> = ({ 
  farm, 
  removed, 
  cakePrice, 
  bnbPrice, 
  ethereum, 
  account, 
}) => {

  // const isCommunityFarm = communityFarms.includes(farm.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  // const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()

  const lpLabel = ( farm.version ? `${farm.lpSymbol} V${farm.version}` : `${farm.lpSymbol}` )
  const prices = usePrices()
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses, risk } = farm
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  const farmImage = farm.isTokenOnly ? farm.tokenSymbol.toLowerCase() : `${farm.tokenSymbol.toLowerCase()}-${farm.quoteTokenSymbol.toLowerCase()}`
  const totalValue = getTotalValueFromQuoteTokens(farm.quoteTokenAmount, farm.quoteTokenSymbol, prices)
  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'
  const BLOCKS_PER_YEAR = new BigNumber(30 * 60 * 24 * 365) // first 30 is for 2s block times
  const rewPerYear = new BigNumber(farm.vikingPerBlock).times(farm.poolWeight) .div(new BigNumber(10).pow(18)).times(BLOCKS_PER_YEAR)
  const farmApyFixed = rewPerYear.times(cakePrice).div(totalValue).times(100)
  const farmAPY = ( farmApyFixed ? ` ${farmApyFixed && farmApyFixed.toNumber().toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}%` : '...loading' )
  const Daily = ( farmApyFixed ? ` ${farmApyFixed && farmApyFixed.div(365).times(7).toNumber().toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}%` : '...loading' )

  // console.log("APY", farm.pid)
  // console.log("rewPerYear", rewPerYear && rewPerYear.toNumber())
  // console.log("cakePrice", cakePrice && cakePrice.toNumber())
  // console.log("totalValue", totalValue && totalValue.toNumber())
  // console.log("farmAPY", farmAPY)

  return (
    <FCard>

      <CardHeading
        lpLabel={lpLabel}
        multiplier={farm.multiplier}
        risk={risk}
        depositFee={farm.depositFeeBP}
        farmImage={farmImage}
        tokenSymbol={farm.tokenSymbol}
      />

      {!removed && (
      <Flex justifyContent='space-between' mt="8px">
        <LightText>tAPR</LightText>
        <Quote>{farmAPY}</Quote>        
      </Flex>)}

      {!removed && (
      <Flex justifyContent='space-between'>
        <LightText>Weekly ROI</LightText>
        <Quote>{Daily}</Quote>
      </Flex>)}

      {!removed && (
      <Flex justifyContent="space-between">
        <LightText>Liquidity</LightText>
        <Quote>{totalValueFormated}</Quote>
      </Flex>)}

      <CardActionsContainer farm={farm} ethereum={ethereum} account={account} />

      {/*
      <Flex justifyContent='center'>
        <ExpandableSectionButton onClick={() => setShowExpandableSection(!showExpandableSection)}/>
      </Flex>

      <ExpandingWrapper expanded={showExpandableSection}>
        <CardActionsContainer farm={farm} ethereum={ethereum} account={account} />
        <Flex justifyContent="left">
          <Link external href={
            farm.isTokenOnly ?
            `https://app.defikingdoms.com/#/marketplace?inputCurrency=${tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
            :
            `https://app.defikingdoms.com/#/add/${liquidityUrlPathParts}`}><span>Add Liquidity </span>
          </Link>
        </Flex>
      </ExpandingWrapper> 
      */}

    </FCard>
  )
}

export default FarmCard
