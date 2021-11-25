import React from 'react'
import styled from 'styled-components'
import { Image, Button, LinkExternal } from '@pancakeswap-libs/uikit'
import { CommunityTag } from 'components/Tags'
import useI18n from 'hooks/useI18n'
import { FaBuilding, FaMountain, FaRegBuilding, FaToolbox, FaTools } from 'react-icons/fa'
import Card from './Card'
import CardTitle from './CardTitle'


const Label2 = styled.p`
  color: #FFFF;
  font-size: 14px;
  margin-bottom: 0px;
  margin-top: 20px;
`

const Coming: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Card>
      <div style={{ padding: '0px' }}>
        <Label2>{TranslateString(4216, 'Join the Incubator program and distribute your token while building liquidity for it. ')}</Label2>
        <Label2>{TranslateString(4216, 'Applications will go through governance and be reviewed by a third party up until permissionless listings are implemented.')}</Label2>
        <Label2><FaTools/> {TranslateString(4216, "Let's build, together. ")}</Label2>
        <Button
          variant="secondary"
          as="a"
          href="https://kv2i2vx5rwe.typeform.com/to/yEQE9cV9"
          external
          fullWidth
          mb="0px"
          mt='20px'
          style={{
            'borderRadius': '5px'
          }}
        >
          {TranslateString(4128, 'Apply')}
        </Button>
      </div>
    </Card>
  )
}

export default Coming
