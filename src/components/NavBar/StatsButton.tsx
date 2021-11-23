import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { CalculateIcon, IconButton, useModal } from '@pancakeswap-libs/uikit'
import { Address } from 'config/constants/types'
import { FaPlus } from 'react-icons/fa'
import Stats from './Stats'

export interface StatsButtonProps {
  cakePrice?: BigNumber
  apy?: BigNumber
  quoteTokenAdresses?: Address
  quoteTokenSymbol?: string
}

const StatsButton: React.FC<StatsButtonProps> = ({
  quoteTokenAdresses,
  quoteTokenSymbol,
  cakePrice,
  apy,
}) => {
  const [onPresentStatsModal] = useModal(
    <Stats/>,
  )

  return (
      <IconButton  onClick={onPresentStatsModal} variant="text" size="sm" >
        <FaPlus/>
      </IconButton>
  )
}

export default StatsButton