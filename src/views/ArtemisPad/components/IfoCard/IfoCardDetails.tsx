import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, Link, Flex } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { FaArrowCircleUp, FaArrowRight, FaBook, FaLink, FaLock, FaLockOpen, FaQuestionCircle, FaUserLock, FaWallet } from 'react-icons/fa'

export interface IfoCardDetailsProps {
  saleAmount: string
  raiseAmount: string
  cakeToBurn: string
  raisingAmount: BigNumber
  totalAmount: BigNumber
  misAmount: string
  tier: string
}



const Divider = styled.div`
  background-color: #2F324A;
  height: 3px;
  margin-left: 100;
  margin-right: 0px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 0%;
`

const DCard = styled.div`
  background: #474B70;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  position: relative;
  box-shadow: 0px 0px 2px #FFFF;

` 

const DCard2 = styled.div`
  background: #3E4266;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
`


const StyledIfoCardDetails = styled.div`
  margin-bottom: 24px;
  padding:0px;
`


const Sub = styled.p`
  color: #FFFF;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 0px;
  margin-top: 2px;
  text-shadow: 0px 0px 0px #4E5C6D;
`
const Sub2 = styled.p`
  color: #D4D4D4;
  font-size: 13px;
  font-weight: 300;
  margin-bottom: 0px;
  margin-top: 2px;
  text-shadow: 0px 0px 0px #D4D4D4;
`

const IfoCardDetails: React.FC<IfoCardDetailsProps> = ({
  saleAmount,
  raiseAmount,
  cakeToBurn,
  raisingAmount,
  totalAmount,
  misAmount,
  tier,
}) => {
  const TranslateString = useI18n()

  return (
    <>
      <StyledIfoCardDetails>
        <DCard>

          <Flex justifyContent="space-between" marginTop='0px' alignItems="center">
            <Sub>Tier</Sub>
            <Sub2>{tier}</Sub2>
          </Flex>
          <Flex justifyContent="space-between" marginTop='5px' alignItems="center">
            <Sub>Collateral Required</Sub>
            <Sub2>{misAmount}</Sub2>
          </Flex>
        </DCard>
        <Divider/>
        <DCard2>
          <Flex justifyContent="space-between" marginTop='0px' alignItems="center">
            <Sub>Token Price</Sub>
            <Sub2>{cakeToBurn}</Sub2>
            </Flex>
          <Flex justifyContent="space-between" marginTop='5px' alignItems="center">
            <Sub>Tokens For Sale</Sub>
            <Sub2>{saleAmount}</Sub2>
            </Flex>
          <Flex justifyContent="space-between" marginTop='5px' alignItems="center">
            <Sub>wONE To Raise</Sub>
            <Sub2>{raiseAmount}</Sub2>
            </Flex>
          <Flex justifyContent="space-between" marginTop='5px' alignItems="center">
            <Sub>wONE Raised</Sub>
            <Sub2>{`${totalAmount.div(raisingAmount).times(100).toFixed(0)}%`}</Sub2>
            </Flex>
        </DCard2>
      </StyledIfoCardDetails>
    </>
  )
}

export default IfoCardDetails
