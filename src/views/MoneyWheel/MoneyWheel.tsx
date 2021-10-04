import React, {useState} from 'react'
import styled from 'styled-components'
import { BaseLayout  } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import Page from 'components/layout/Page'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from '../../utils/addressHelpers'
import Hero from './components/Hero'
import WheelCard from './components/WheelCard'
import BetCard from './components/BetCard'


const Cards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;
  & > div {
    grid-column: span 6;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const SvgHero = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  padding: 42px 12px;

  @media all and (max-width: 1350px) { 
    max-width: 100%;
  }
`

const Blablabla = styled.div`
  text-color: red;
  margin: 0px 18px;
  justify-content: center;
  position: relative;
  display: flex;
  align-items: center;
  white-space: pre-wrap;
  font-size: 16px;
  line-height: 1.3;
`

const MoneyWheel: React.FC = () => {
  const cakeBalance = (useTokenBalance(getCakeAddress()))
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const onResult = (lastResult: any) => {
    setPrizeNumber(lastResult.spin)
    setMustSpin(true)
  }

  const onStopping = () => {
    setMustSpin(false)
  }
  
  return (
    <div>

      <Page>
        <Cards>
            <div>
              <WheelCard prizeNumber={prizeNumber} mustSpin={mustSpin} onStopping={onStopping}/>
            </div>
            <div>
              <BetCard max={new BigNumber(cakeBalance)} tokenName="MIS" onResult={onResult}/>
            </div>
          </Cards>

      </Page>
    </div>
  )
}

export default MoneyWheel