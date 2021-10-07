import React from 'react'
import styled from 'styled-components'
import { Link, Progress, Text } from '@pancakeswap-libs/uikit'
import { FaClock, FaHourglassEnd } from 'react-icons/fa'
import useI18n from 'hooks/useI18n'

interface IfoCardProgressProps {
  progress: number
  launchDate: string
  launchTime: string
  endDate: string
  endTime: string
}

const StyledProgress = styled.div`
  margin-bottom: 14px;
`

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  margin-bottom: 10px;
`

const Display = styled(Text)`
  flex: 1;
`

const IfoCardProgress: React.FC<IfoCardProgressProps> = ({ progress, launchDate, launchTime, endDate, endTime }) => {
  const TranslateString = useI18n()
  return (
    <StyledProgress>
      <Item>
          <Display bold><FaClock/> {TranslateString(5822, 'Presale Launch')}</Display>
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
        <Item>
        <Display bold><FaHourglassEnd/> {TranslateString(5822, 'Presale End')}</Display>
           <Text>
             {endDate},
             <Link
               href="https://www.timeanddate.com/worldclock/timezone/utc"
               target="blank"
               rel="noopener noreferrer"
               ml="4px"
               style={{ display: 'inline' }}
             >
               {endTime}
             </Link>
          </Text>
        </Item>
      <Progress primaryStep={progress} />
      
    </StyledProgress>
  )
}

export default IfoCardProgress
