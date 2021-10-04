import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, LinkExternal, Link } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'

export interface IfoCardDetailsProps {
  launchDate: string
  launchTime: string
  saleAmount: string
  raiseAmount: string
  cakeToBurn: string
  projectSiteUrl: string
  raisingAmount: BigNumber
  totalAmount: BigNumber
}

const StyledIfoCardDetails = styled.div`
  margin-bottom: 24px;
`

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
`

const Display = styled(Text)`
  flex: 1;
`

const IfoCardDetails: React.FC<IfoCardDetailsProps> = ({
  launchDate,
  launchTime,
  saleAmount,
  raiseAmount,
  cakeToBurn,
  projectSiteUrl,
  raisingAmount,
  totalAmount,
}) => {
  const TranslateString = useI18n()

  return (
    <>
      <StyledIfoCardDetails>
        <Item>
          <Display bold>{TranslateString(582, 'Launch Time')}</Display>
          <Text>
            {launchDate},
            <Link
              href="https://www.timeanddate.com/worldclock/singapore/singapore"
              target="blank"
              rel="noopener noreferrer"
              ml="4px"
              style={{ display: 'inline' }}
            >
              {launchTime}
            </Link>
          </Text>
        </Item>
        <Item>
          <Display bold>{TranslateString(584, 'For Sale')}</Display>
          <Text>{saleAmount}</Text>
        </Item>
        <Item>
          <Display bold>{TranslateString(999, 'To Raise ($USD)')}</Display>
          <Text>{raiseAmount}</Text>
        </Item>

        
        {/*
        <Item>
          <Display>{TranslateString(999, 'ONE to burn (USD)')}</Display>
          <Text>{cakeToBurn}</Text>
        </Item>
        */}
        <Item>
          <Display bold>{TranslateString(999, 'Total Raised (% of Target)')}</Display>
          <Text>{`${totalAmount.div(raisingAmount).times(100).toFixed(2)}%`}</Text>
        </Item>

        <LinkExternal href="https://viper.exchange/#/swap?outputCurrency=0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a" mr="16px">
            {TranslateString(999, 'Apply for Launch')}
      </LinkExternal>

      </StyledIfoCardDetails>
      <LinkExternal href={projectSiteUrl} style={{ margin: 'auto' }}>
        {TranslateString(4012, 'Read Artemis Docs')}
      </LinkExternal>


    </>



  )
}

export default IfoCardDetails
