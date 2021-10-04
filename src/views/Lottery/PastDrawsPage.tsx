import React from 'react'
import styled from 'styled-components'
import { BaseLayout } from '@pancakeswap-libs/uikit'
import PastLotteryRoundViewer from './components/PastLotteryRoundViewer'
import PastDrawsHistoryCard from './components/PastDrawsHistory/PastDrawsHistoryCard'
import WinningNumbers from './components/WinningNumbers'

const Cards = styled(BaseLayout)`
  align-items: center;
  margin-bottom: 32px;
`

const PastDrawsPage: React.FC = () => {
  return (
    <Cards>
      <WinningNumbers />
    </Cards>
  )
}

export default PastDrawsPage
