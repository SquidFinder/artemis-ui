import React from 'react'
import styled from 'styled-components'
import { Text, Heading, BaseLayout, Button, LinkExternal, Flex, Image } from '@pancakeswap-libs/uikit'
import { ifosConfig } from 'config/constants'
import useI18n from 'hooks/useI18n'
import FlexLayout from 'components/layout/Flex'
import IfoCard from './components/IfoCard'
import Title from './components/Title'
import IfoCards from './components/IfoCards'

const LaunchpadLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 200px;
    max-width: 47%;
    width: 50%;
    margin: 0 8px;
    margin-bottom: 28px;
  }
`

const Layout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    width: 365px;
    
  }

`

const activeIfo = ifosConfig.find((ifo) => ifo.tier === '1')
const activeIfo2 = ifosConfig.find((ifo) => ifo.tier === '2')
const activeIfo3 = ifosConfig.find((ifo) => ifo.tier === '3')

const Ifo = () => {
  const TranslateString = useI18n()

  return (
    <Layout>
        <IfoCards>
          <IfoCard ifo={activeIfo} />
        </IfoCards>   
        <IfoCards>
          <IfoCard ifo={activeIfo2} />
        </IfoCards>   
        <IfoCards>
          <IfoCard ifo={activeIfo3} />
        </IfoCards>
    </Layout>
  )
  
}

export default Ifo
