import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, LinkExternal, Link } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { FaBook, FaLink } from 'react-icons/fa'

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



const Divider = styled.div`
background-color: #4c68ef;
height: 3px;
margin-left: 100;
margin-right: 0px;
margin-top: 5px;
margin-bottom: 5px;
width: 100%;
`

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
              href="https://www.timeanddate.com/worldclock/timezone/utc"
              target="blank"
              rel="noopener noreferrer"
              ml="4px"
              style={{ display: 'inline' }}
            >
              {launchTime}
            </Link>
          </Text>
        </Item>
        <Divider />
        <Item>
          
          <Display bold>{TranslateString(5824, 'Tokens For Sale')}</Display>
          <Text>{saleAmount}</Text>
        </Item>
        <Item>
          <Display bold>{TranslateString(999, 'USD To Raise')}</Display>
          <Text>{raiseAmount}</Text>
        </Item>

        
        {/*
        <Item>
          <Display>{TranslateString(999, 'ONE to burn (USD)')}</Display>
          <Text>{cakeToBurn}</Text>
        </Item>
        */}
        <Item>
          <Display bold>{TranslateString(999, 'Total Raised')}</Display>
          <Text>{`${totalAmount.div(raisingAmount).times(100).toFixed(1)}%`}</Text>
        </Item>


      </StyledIfoCardDetails>
      <LinkExternal href={projectSiteUrl} style={{ margin: 'auto' }}>
      <FaBook/>{TranslateString(4012, ' Research Project')}
      </LinkExternal>


    </>



  )
}

export default IfoCardDetails
