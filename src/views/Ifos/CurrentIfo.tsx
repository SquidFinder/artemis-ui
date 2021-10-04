import React from 'react'
import styled from 'styled-components'
import { Text, Heading, BaseLayout, Button, LinkExternal, Flex, Image } from '@pancakeswap-libs/uikit'
import { ifosConfig } from 'config/constants'
import useI18n from 'hooks/useI18n'
import FlexLayout from 'components/layout/Flex'
import IfoCard from './components/IfoCard'
import Title from './components/Title'
import IfoCards from './components/IfoCards'

const LaunchIfoCallout = styled(BaseLayout)`
  border-top: 0px solid ${({ theme }) => theme.colors.textSubtle};
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  margin: 0 auto;
  padding: 32px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
  }
`

const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }
`

const LaunchpadLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 280px;
    max-width: 47%;
    width: 90%;
    margin: 0 8px;
    margin-bottom: 28px;
  }
`


/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = ifosConfig.find((ifo) => ifo.isActive)
const activeIfo2 = ifosConfig.find((ifo) => ifo.isActive2)

const Ifo = () => {
  const TranslateString = useI18n()

  return (
    <LaunchpadLayout>

        <IfoCards isSingle>
          <IfoCard ifo={activeIfo} />
        </IfoCards>    
          
        <IfoCards isSingle>
          <IfoCard ifo={activeIfo2} />
        </IfoCards>


    </LaunchpadLayout>
  )
}

export default Ifo
