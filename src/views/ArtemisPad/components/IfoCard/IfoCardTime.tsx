import React from 'react'
import styled from 'styled-components'
import { Link, LinkExternal, Text } from '@pancakeswap-libs/uikit'
import { IfoStatus } from 'config/constants/types'
import getTimePeriods from 'utils/getTimePeriods'
import useI18n from 'hooks/useI18n'

export interface IfoCardTimeProps {
  isLoading: boolean
  status: IfoStatus
  secondsUntilStart: number
  secondsUntilEnd: number
  block: number
  address: string
}

const Details = styled.div`
  align-items: center;
  display: flex;
  height: 0px;
  justify-content: center;
  margin-bottom: 0px;
`

const Countdown = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-top: 10px;
`

const Sub = styled.p`
  color: #fff;
  font-size: 14.5px;
  font-weight: 500;
  margin-bottom: 0px;
  margin-top: 15px;
  text-shadow: 0px 0px 0px #D4D4D4;
`

const IfoCardTime: React.FC<IfoCardTimeProps> = ({ isLoading, status, secondsUntilStart, secondsUntilEnd, block, address }) => {
  const TranslateString = useI18n()
  const countdownToUse = status === 'coming_soon' ? secondsUntilStart : secondsUntilEnd
  const timeUntil = getTimePeriods(countdownToUse)
  const suffix = status === 'coming_soon' ? 'Start' : 'Finish'

  if (isLoading) {
    return <Sub >{TranslateString(656, 'Loading...')}</Sub>
  }

  if (countdownToUse <= 0) {
    return (
      <Details>
        <Sub>{TranslateString(999, 'Finished')}</Sub>

      </Details>
    )
  }

  return (
    <Details>
      <div>
       <Sub>{`${timeUntil.days}d, ${timeUntil.hours}h, ${timeUntil.minutes}m`} Remaining</Sub>
       
       {/* <div style={{display: 'flex', justifyContent: 'center'}}>
        <LinkExternal href={`https://explorer.harmony.one/block/${block}`} target="blank" rel="noopener noreferrer" mt="10px">
          Explorer
        </LinkExternal> 
        <LinkExternal href={`https://explorer.harmony.one/address/${address}`} target="blank" rel="noopener noreferrer" mt="10px" ml="10px">
          View Contract
        </LinkExternal> */ }

      </div>
    </Details>
  )
}

export default IfoCardTime
