import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Skeleton, LinkExternal } from '@pancakeswap-libs/uikit'
import { Farm } from 'state/types'
import { provider } from 'web3-core'
import useI18n from 'hooks/useI18n'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { PoolCategory, QuoteToken } from 'config/constants/types'
import { FaFire, FaFlask, FaGhost, FaLock, FaMountain, } from 'react-icons/fa'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

const RainbowLight = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const StyledCardAccent = styled.div`
  background: linear-gradient(45deg,
  rgba(255, 0, 0, 1) 0%,
  rgba(255, 154, 0, 1) 10%,
  rgba(208, 222, 33, 1) 20%,
  rgba(79, 220, 74, 1) 30%,
  rgba(63, 218, 216, 1) 40%,
  rgba(47, 201, 226, 1) 50%,
  rgba(28, 127, 238, 1) 60%,
  rgba(95, 21, 242, 1) 70%,
  rgba(186, 12, 248, 1) 80%,
  rgba(251, 7, 217, 1) 90%,
  rgba(255, 0, 0, 1) 100%);
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 0.5px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 12px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`


const Quote = styled.p`
    font-size: 15px;
    margin-bottom: 8px;
`

const APRTEXT = styled.p`
    font-size: 15px;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

const StyledLinkExternal = styled(LinkExternal)`
  svg {
    padding-left: 0px;
    height: 16px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }

  text-decoration: none;
  font-weight: bold;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: right;
`

const Divider = styled.div`
  background-color: #4c68ef;
  height: 2px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 5px;
  width: 100%;`

const Divider2 = styled.div`
  background-color: #4c68ef;
  height: 0px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 0%;
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
  const earnLabel = 'MIS'
  const TranslateString = useI18n()
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses, risk } = farm
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  const farmImage = farm.isTokenOnly ? farm.tokenSymbol.toLowerCase() : `${farm.tokenSymbol.toLowerCase()}-${farm.quoteTokenSymbol.toLowerCase()}`
  
  const totalValue: BigNumber = useMemo(() => {
      if (farm.pid === 2) {
        // MIS Pool
        return cakePrice.times(farm.tokenAmount)
      }
      if (farm.pid === 0 || farm.pid === 3) {
          // These all have quote symbol as a stablecoin
          return new BigNumber(2).times(farm.quoteTokenAmount)
      }
      if (farm.pid === 1 || farm.pid === 4) {
          // One as quote token
          return new BigNumber(2).times(bnbPrice).times(farm.quoteTokenAmount)
      }
      console.log("No price found for pid = ", farm.pid)
      return new BigNumber(0)
  }, [bnbPrice, cakePrice, farm])

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const BLOCKS_PER_YEAR = new BigNumber(30 * 60 * 24 * 365) // first 30 is for 2s block times
  const rewPerYear = new BigNumber(farm.vikingPerBlock).times(farm.poolWeight) .div(new BigNumber(10).pow(18)).times(BLOCKS_PER_YEAR)
  const farmApyFixed = rewPerYear.times(cakePrice).div(totalValue).times(100)
  const farmAPY = ( farmApyFixed ? ` ${farmApyFixed && farmApyFixed.toNumber().toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}%` : '...loading' )
    
    // console.log("APY", farm.pid)
    // console.log("rewPerYear", rewPerYear && rewPerYear.toNumber())
    // console.log("cakePrice", cakePrice && cakePrice.toNumber())
    // console.log("totalValue", totalValue && totalValue.toNumber())
    // console.log("farmAPY", farmAPY)
  
  return (
    <FCard>
      {farm.tokenSymbol === 'MIS' && <StyledCardAccent />}
      <CardHeading
        lpLabel={lpLabel}
        multiplier={farm.multiplier}
        risk={risk}
        depositFee={farm.depositFeeBP}
        farmImage={farmImage}
        tokenSymbol={farm.tokenSymbol}
      />

      {!removed && (
        <Flex justifyContent='space-between' alignItems='center' mt="5px">
          <span><FaMountain/> APR</span>
          <APRTEXT style={{ display: 'flex', alignItems: 'center' }}>
            {farm.apy ? (
              <>
                <ApyButton
                  lpLabel={lpLabel}
                  quoteTokenAdresses={quoteTokenAdresses}
                  quoteTokenSymbol={quoteTokenSymbol}
                  tokenAddresses={tokenAddresses}
                  cakePrice={cakePrice}
                  apy={farm.apy}
                />
                &nbsp;&nbsp;{farmAPY}
              </>
            ) : (
              <Skeleton height={24} width={80} />
            )}
          </APRTEXT>
        </Flex>
      )}

      <Flex justifyContent='space-between'>
        <span><FaFlask/> Earn</span>
        <Quote>{TranslateString(10006, 'MIS + Fees')}</Quote>
      </Flex>

      {/*
      <Flex justifyContent='space-between'>
        <span><FaLock/> Lockup</span>
        <Quote>{TranslateString(10006, '0 Hours')}</Quote>
      </Flex>
      */}

      <Flex justifyContent='space-between'>
        <span><FaFire/> Deposit Fee</span>
        <Quote>{ ( !Number.isNaN(farm.depositFeeBP) ? `${(farm.depositFeeBP / 100)}%` : '...loading') }</Quote>
      </Flex>


      <Flex justifyContent="left">
        <StyledLinkExternal external href={
          farm.isTokenOnly ?
            `https://viperswap.one/swap?inputCurrency=${tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
            :
            `https://viperswap.one/#/add/${liquidityUrlPathParts}`
        }>
          <span><FaGhost/> Get LP Tokens</span>
        </StyledLinkExternal>
      </Flex>
      
      <Divider/>

      <CardActionsContainer farm={farm} ethereum={ethereum} account={account} />

      <Divider2/>

      <Flex justifyContent='right'>
        <ExpandableSectionButton onClick={() => setShowExpandableSection(!showExpandableSection)}/>
      </Flex>

      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
          removed={removed}
          isTokenOnly={farm.isTokenOnly}
          bscScanAddress={
            farm.isTokenOnly ?
              `https://explorer.harmony.one/address/${farm.tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
              :
              `https://explorer.harmony.one/address/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`
          }
          totalValueFormated={totalValueFormated}
          lpLabel={lpLabel}
          quoteTokenAdresses={quoteTokenAdresses}
          quoteTokenSymbol={quoteTokenSymbol}
          tokenAddresses={tokenAddresses}
        />
      </ExpandingWrapper>
    </FCard>
  )
}

export default FarmCard
