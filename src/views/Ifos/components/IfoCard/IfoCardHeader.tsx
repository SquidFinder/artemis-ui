import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Heading, Text, Flex, Link, LinkExternal } from '@pancakeswap-libs/uikit'
import { FaBook } from 'react-icons/fa'

interface IfoCardHeaderProps {
  ifoId: string
  name: string
  subTitle: string
  projectSiteUrl: string
}

const StyledIfoCardHeader = styled(Flex)`
  & > div {
    flex: 1;
  }
`

const Name = styled(Heading).attrs({ as: 'h3', size: 'lg' })`
  margin-bottom: 4px;
  text-align: right;
`

const Description = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  text-align: right;
`

const IfoCardHeader: React.FC<IfoCardHeaderProps> = ({ ifoId, name, subTitle, projectSiteUrl }) => {
  const TranslateString = useI18n()
  return (
    <StyledIfoCardHeader mb="24px" alignItems="center">
      <img src={`/images/ifos/${ifoId}.svg`} alt={ifoId} width="70px" height="70px" />
      <div>
        <LinkExternal href={projectSiteUrl} style={{ marginLeft: '110px', marginBottom: '4px', textAlign: 'right', fontSize: '20px' }}>
        {TranslateString(999, name)}
        </LinkExternal>
        <Description>{subTitle}</Description>
      </div>
    </StyledIfoCardHeader>
  )
}

export default IfoCardHeader
