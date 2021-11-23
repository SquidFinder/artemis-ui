import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { calculateCakeEarnedPerThousandDollars, apyModalRoi } from 'utils/compoundApyHelpers'
import { Address } from 'config/constants/types'

interface StatsModalProps {
  onDismiss?: () => void
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 15px;
`

const GridItem = styled.div`
  margin-bottom: '10px';
`

const Description = styled(Text)`
  max-width: 360px;
  margin-bottom: 10px;
`

const Stats: React.FC<StatsModalProps> = ({
  onDismiss,

}) => {
  const TranslateString = useI18n()

  return (
    <Modal title="Return on Investment Calculator" onDismiss={onDismiss}>
      <Grid>
        <GridItem>
          <Text fontSize="11px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(999, 'Timeframe')}
          </Text>
        </GridItem>
        
      </Grid>
      <Description fontSize="12px" color="textSubtle">
        {TranslateString(
          999,
          'Calculated based on an estimate of current rates, compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.',
        )}
      </Description>
    </Modal>
  )
}

export default Stats
