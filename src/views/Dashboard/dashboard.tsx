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
import { FaQuestionCircle, FaArrowLeft, FaLongArrowAltLeft } from 'react-icons/fa';

import { useTotalRewards } from 'hooks/useTickets'

import useTokenBalance, { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { Link } from 'react-router-dom'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import Container from 'components/layout/Container'
import { getCakeAddress } from '../../utils/addressHelpers'

const Price = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-color: rgba(0, 0, 0,0) !important;
  border: 1px;
  border-style: solid !important;
  border-color: #405fb4 !important;
  border-radius: 16px;
  color: #405fb4;
  font-size: 15px;
  font-weight: 800;
  width: 100%;
  display: inline-flex;
  min-height: 21px;
  max-height: 37px;
  letter-spacing: 0.03em;
  padding: 15px;
`

const DashboardPage2 = styled(Container)`
  min-height: calc(1vh - 64px);
  padding-top: 16px;
  padding-bottom: 6px;
  padding: 5px;
  max-width: 740px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 21px;
    padding-bottom: 32px;
  }
`

const StyledBtn = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-color: rgba(0, 0, 0,0) !important;
  border: 1px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 10px;
  color: #ffff;
  font-size: 15px;
  font-weight: 400;
  width: 100%;
  display: inline-flex;
  min-height: 18px;
  max-height: 30px;
  max-width: 40px;
  padding: 12px;
  box-shadow: 0px 0px 10px #ccc;

  `



const Test = styled.text`
  background-color: rgba(0, 0, 0,0) !important;
  background: rgba(0, 0, 0,0) !important;
  font-size: 20px;
  font-weight: 600;
  text-shadow: 0px 0px 10px #ccc;

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
text-shadow: 0px 0px 0px #4E5C6D;
`


const DashboardCard = styled.div`
  align-self: baseline;
  background: linear-gradient(to right, #25283F, #3F4361, #25283F);

  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 5px;
  position: relative;
  text-align: center;


  border: 0px solid #fff;
  box-shadow: 0px 0px 5px #ccc;

`

const DashCard = styled.div`
  align-self: baseline;
  background: linear-gradient(to right, #25283F, #3F4361, #25283F);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 28px;
  position: relative;
  text-align: center;



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
          <DashCard style={{padding:'40px'}} >
            <Flex justifyContent="space-between" alignItems="center">
              <Flex flexDirection="column" alignItems='center'> 
                <Stat>${tokenPrice}</Stat>
                <Sub>Per MIS</Sub>
              </Flex>
              <Flex flexDirection="column" alignItems='center'>
                <Stat>{mCap}</Stat>
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
          </DashCard>
        </div>
      </DashboardCard>
    </DashboardPage2>
  )
}
export default MoneyWheel


const Divider = styled.div`
  background-color: #1E2129;
  height: 0px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 7px;
  margin-bottom: 7px;
  width: 0%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`
const DetailsCard = styled.div`
background: rgba(0, 0, 0,0) !important;
border-radius: 0px;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
  position: center;
  text-align: center;
`