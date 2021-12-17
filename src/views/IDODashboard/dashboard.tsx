import React from 'react'
import styled from 'styled-components'
import { Flex,  } from '@pancakeswap-libs/uikit'
import { Link } from 'react-router-dom'
import FlexStaking from 'components/layout/FlexStaking'
import Page from 'components/layout/Page'

const IdoCard = styled.div`
  align-self: baseline;
  background-image: linear-gradient(#2F324A, #33364D);
  border-radius: 20px;
  border: 2px solid #CECECE;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 25px;
  position: relative;
  text-align: center;

  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    outline: 0;
    border-color: #FFFF;
    box-shadow: 0px 0px 0px #cccc;
  }
`

const CurrentIdoCard = styled.div`
  align-self: baseline;
  background-image: linear-gradient(#2F324A, #33364D);
  border-radius: 20px;
  border: 2px solid #CECECE;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 25px;
  position: relative;
  text-align: center;
  box-shadow: 0px 0px 4px #ccc;
  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    outline: 0;
    border-color: #FFFF;
    box-shadow: 0px 0px 3px #cccc;
  }
`

const Sub = styled.p`
  color: #FFFF;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 0px;
  margin-top: 2px;
  text-shadow: 0px 0px 0px #4E5C6D;
`

const Title = styled.p`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 0px;
  text-shadow: 0px 0px 0px #ccc;
  color: #ffff;
  margin-left: 10px;
  margin-top: 8px;
`

const Text = styled.p`
  color: #D4D4D4;
  font-size: 13px;
  font-weight: 300;
  margin-bottom: 0px;
  margin-top: 2px;
  text-shadow: 0px 0px 0px #D4D4D4;
`

const Divider = styled.div`
  background-color: #FFFF;
  margin-bottom: 20px;
  margin-top: 20px;
  width: 100%;
  height: 1px;
  box-shadow: 0px 0px 0px #ffff;
`

const IDODashboard: React.FC = () => {
  return (
    <Page>
      <FlexStaking>
        <CurrentIdoCard>
          <Link to="/artemispad/lumen" className="nav-links">
            <div>
              <div>
                <Flex justifyContent='left' marginBottom='20px'>
                  <object type="image/svg+xml" data='/images/idoDashboard/lumen.svg' width="30px">&nbsp;</object> 
                  <Title>Tranquility City ($LUMEN)</Title>
                </Flex>
              </div>
              <div>
                <Flex justifyContent="space-between" marginTop='5px' alignItems="center">
                  <Flex flexDirection="column" alignItems='center'> 
                    <Text>IDO Price</Text>
                    <Sub>TBA</Sub>
                  </Flex>
                  <Flex flexDirection="column" alignItems='center'>
                    <Text>Token ATH</Text>
                    <Sub>TBA</Sub> 
                  </Flex>
                  <Flex flexDirection="column" alignItems='center'>
                    <Text>Total Raised</Text>
                    <Sub>TBA</Sub>
                  </Flex>
                </Flex>
              </div>
            </div>
          </Link>
        </CurrentIdoCard>
        <IdoCard>
          <div>
            <div>
              <Flex justifyContent='left' marginBottom='20px'>
                <object type="image/svg+xml" data='/images/idoDashboard/rvrs.svg' width="30px">&nbsp;</object> 
                <Title>Reverse Protocol ($RVRS)</Title>
              </Flex>
            </div>
            <div>
              <Flex justifyContent="space-between" marginTop='5px' alignItems="center">
                <Flex flexDirection="column" alignItems='center'> 
                  <Text>IDO Price</Text>
                  <Sub>TBA</Sub>
                </Flex>
                <Flex flexDirection="column" alignItems='center'>
                  <Text>Token ATH</Text>
                  <Sub>TBA</Sub> 
                </Flex>
                <Flex flexDirection="column" alignItems='center'>
                  <Text>Total Raised</Text>
                  <Sub>TBA</Sub>
                </Flex>
              </Flex>
            </div>
          </div>
          <Divider/>
          <div>
            <div>
              <Flex justifyContent='left' marginBottom='20px'>
                <object type="image/svg+xml" data='/images/idoDashboard/mis.svg' width="30px">&nbsp;</object> 
                <Title>Artemis Protocol ($MIS)</Title>
              </Flex>
            </div>
            <div>
              <Flex justifyContent="space-between" marginTop='5px' alignItems="center">
                <Flex flexDirection="column" alignItems='center'> 
                  <Text>IDO Price</Text>
                  <Sub>TBA</Sub>
                </Flex>
                <Flex flexDirection="column" alignItems='center'>
                  <Text>Token ATH</Text>
                  <Sub>TBA</Sub> 
                </Flex>
                <Flex flexDirection="column" alignItems='center'>
                  <Text>Total Raised</Text>
                  <Sub>TBA</Sub>
                </Flex>
              </Flex>
            </div>
          </div>
        </IdoCard>
      </FlexStaking>
    </Page>
  )
}
export default IDODashboard
