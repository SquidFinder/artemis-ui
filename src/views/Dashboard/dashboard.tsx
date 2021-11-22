import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import { BaseLayout, Button, Card, Flex,  } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { usePriceCakeBusd, useTotalValue } from 'state/hooks'
import { useAllHarvest } from 'hooks/useHarvest'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import CakeHarvestBalance from 'views/Home/components/CakeHarvestBalance'
import UnlockButton from 'components/UnlockButton'
import CakeWalletBalance from 'views/Home/components/CakeWalletBalance'
import CardValue from 'views/Home/components/CardValue'
import farms from 'state/farms'
import { useTotalRewards } from 'hooks/useTickets'
import useTokenBalance, { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { Link } from 'react-router-dom'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import Container from 'components/layout/Container'
import { getCakeAddress } from '../../utils/addressHelpers'


const DashboardPage2 = styled(Container)`
  min-height: calc(1vh - 64px);
  max-width: 500px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 20px;
    padding-bottom: 24px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 15px;
    padding-bottom: 50px;
  }
`

const Stat = styled.text`
  font-size: 15px;
  font-weight: 500;
  text-shadow: 0px 0px 10px #ccc;
`

const Sub = styled.p`
  color: #7F8997;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 0px;
  margin-top: 2px;
  text-shadow: 0px 0px 0px #4E5C6D;
`

const DashboardCard = styled.div`
  align-self: baseline;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0px;
  position: relative;
  text-align: center;
  border: 0px solid #EAEAEA;
`
  
const MoneyWheel: React.FC = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress())).toLocaleString('en-us',{ maximumFractionDigits: 1 });
  const eggPrice = usePriceCakeBusd().toNumber()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const earningsSum = farmsWithBalance.reduce((accum, farm) => {
    return accum + new BigNumber(farm.balance).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)

  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)
  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))
  const cakePriceUsd = usePriceCakeBusd()
  const misPrice = usePriceCakeBusd();
  const tokenPrice = cakePriceUsd.toNumber().toFixed(2);
  const totalValue = useTotalValue().toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 });
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
  const cakeSupply = getBalanceNumber(circSupply);
  const circulatingMath = new BigNumber(cakeSupply);
  const circulatingRVRS = circulatingMath.toNumber();
  const circulatingRvrsString = circulatingRVRS.toLocaleString('en-us',{ maximumFractionDigits: 0 });
  const mCap = misPrice.times(circulatingRVRS).toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 });
  const marketCap = ( misPrice.times(circSupply).isNaN() || ! misPrice.times(circSupply).isFinite() 
  ? new BigNumber(0) : misPrice.times(circSupply) );
  let vikingPerBlock = 0;
  // if (process.env.REACT_APP_DEBUG === "true"){ console.log(farms[0], 'testing viking per block') }
  if(farms && farms[0] && farms[0].vikingPerBlock){
    vikingPerBlock = new BigNumber(farms[0].vikingPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  return (
    <DashboardPage2>
      <DashboardCard>
        <div>
          <Flex justifyContent="space-between" marginTop='5px' alignItems="center">
            <Flex flexDirection="column" alignItems='center'> 
              <Stat>${tokenPrice}</Stat>
              <Sub>Per MIS</Sub>
            </Flex>
            <Flex flexDirection="column" alignItems='center'>
              <Stat>${mCap}</Stat>
              <Sub>Market Cap</Sub> 
            </Flex>
            <Flex flexDirection="column" alignItems='center'> 
              <Stat>${totalValue}</Stat>
              <Sub>Value Locked</Sub>
            </Flex>
            <Flex flexDirection="column" alignItems='center'>
              <Stat>{circulatingRvrsString}</Stat>
              <Sub>Circulating</Sub>
            </Flex>
          </Flex>
        </div>
      </DashboardCard>
    </DashboardPage2>
  )
}
export default MoneyWheel
