import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex,  } from '@pancakeswap-libs/uikit'
import { Link } from 'react-router-dom'
import Page from 'components/layout/Page'
import { FaArrowRight, FaCheck, FaCross, FaThumbsUp } from 'react-icons/fa'
import FlexIdoDashboard from 'components/layout/FlexIdoDashboard'
import { Alert, Container } from 'react-bootstrap'
import { usePriceBnbBusd, usePriceCakeBusd } from 'state/hooks'
import BigNumber from 'bignumber.js'
import Upcoming from './upcoming'

const IdoCard = styled.div`
  align-self: baseline;
  background-image: linear-gradient(#2F324A, #33364D);
  border-radius: 20px;
  border: 2px solid #CECECE;
  display: flex;
  margin-top: 0px;
  padding: 5px;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  text-align: center;
`

const ProjectCard = styled.div`
  align-self: baseline;
  background-image: linear-gradient(#2F324A, #33364D);
  border-radius: 20px;
  border: 0px solid #CECECE;
  display: flex;
  margin-top: 2px;
  margin-bottom: 2px;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  position: relative;
  text-align: center;
  box-shadow: 0px 0px 0px #ccc;
  
  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    outline: 0;
    border-color: #FFFF;
    box-shadow: 0px 0px 0px #cccc;
    background-image: linear-gradient(#404360, #404360);
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

const IDO = styled.p`
  color: #D4D4D4;
  font-size: 15px;
  font-weight: 500;
  text-shadow: 0px 0px 0px #D4D4D4;
`

const Divider = styled.div`
  background-color: #FFFF;
  margin-bottom: 0px;
  margin-top: 0px;
  width: 0%;
  height: 1px;
  box-shadow: 0px 0px 0px #ffff;
`

const TitleDivider = styled.div`
  background-color: #FFFF;
  margin-bottom: 5px;
  margin-top: 20px;
  width: 100%;
  height: 0.5px;
  box-shadow: 0px 0px 0px #ffff;
`

const IDOs = styled.p`
  font-size: 15px;
  font-weight: 500;
  padding-top: 10px;
  text-shadow: 0px 0px 20px #ccc;
  color: #ffff;
  margin-left: 10px;
  margin-top: 8px;
`
const Ignore = styled.p`
  font-size: 0px;
  font-weight: 0;
  padding-top: 10px;
  color: #ffff;
  margin-left: 10px;
  margin-top: 8px;
`

const AlertTxt = styled.p`
  font-size: 13px;
  font-weight: 0;
  color: #ffff;
`

const IDODashboard: React.FC = () => {
  const onePrice = usePriceBnbBusd()
  const misPrice = usePriceCakeBusd()
  const oneToRaiseImrtl = 6300000
  const usdToRaiseImrtl = new BigNumber(oneToRaiseImrtl).times(onePrice).toNumber().toLocaleString('en-us', { maximumFractionDigits: 0, minimumFractionDigits: 0 })
  const priceImrtl = new BigNumber(0.00386).times(onePrice).toNumber().toLocaleString('en-us', { maximumFractionDigits: 5, minimumFractionDigits: 3 })
  const marketCapImrtl = new BigNumber(0.00386).times(onePrice).times(2500000000).toNumber().toLocaleString('en-us', { maximumFractionDigits: 0, minimumFractionDigits: 0 })
  const [modalOpen, setModalOpen] = useState(true) 
  const handleModal = async () => {
    setModalOpen(!modalOpen)
  }  
  return (
    <Page>
      <div style={{'display': ( modalOpen ? 'block' : 'none' )}}>
      <Alert style={{backgroundColor:'#BF0000'}} onClick={handleModal}>
        <Flex justifyContent='space-between'>
          <AlertTxt>Disclaimer</AlertTxt>
          <FaCheck/>
        </Flex>
          <hr/>
          <AlertTxt>
            The Artemis Protocol IDO Launchpad is not available to residents of the United States of America. In using the Artemis Protocol, you confirm that you are not located in, incorporated or otherwise established in, or a citizen or resident of, a Prohibited Jurisdiction.
          </AlertTxt>
        </Alert>
        </div>
      <Container>
      <Upcoming/>
     <FlexIdoDashboard>
        <IdoCard>
           <div>
            <Flex justifyContent='center' marginBottom='0px'>
              <IDOs>Current</IDOs>
            </Flex>
          </div>
          <TitleDivider/>

          {/*
          <ProjectCard>
            <Ignore>xx</Ignore>
          </ProjectCard> */}

          <Link to="/immortl" className="nav-links">
           {/* <ProjectCard>
                <div>
                  <Flex justifyContent='left' marginBottom='10px'>
                    <object type="image/svg+xml" data='/images/idoDashboard/immortl.svg' width="30px">&nbsp;</object> 
                    <Title>Immortl ONE</Title>
                  </Flex>
                </div>
                <div>
                  <Flex justifyContent="space-between" marginTop='5px' alignItems="center">
                    <Flex flexDirection="column" alignItems='center'>
                      <Text>IDO Price</Text>
                      <Sub>${priceImrtl}</Sub> 
                    </Flex>
                    <Flex flexDirection="column" alignItems='center'> 
                      <Text>Est. Market Cap</Text>
                      <Sub>${marketCapImrtl}</Sub>
                    </Flex>
                    <Flex flexDirection="column" alignItems='center'>
                      <Text>To Raise</Text>
                      <Sub>${usdToRaiseImrtl}</Sub>
                    </Flex>
                  </Flex>
                </div>
            </ProjectCard> */}
          </Link>

        </IdoCard>  
        <IdoCard>
          <div>
            <div>
              <Flex justifyContent='center' marginBottom='0px'>
                <IDOs>Completed</IDOs>
              </Flex>
            </div>
            <TitleDivider/>
            
            <Divider/>
          <div>
          <a href="https://www.one-immortl.com/">
            <ProjectCard>
              <div>
                <Flex justifyContent='left' marginBottom='10px'>
                  <object type="image/svg+xml" data='/images/idoDashboard/immortl.svg' width="30px">&nbsp;</object> 
                  <Title>Immortl One</Title>
                </Flex>
              </div>
              <div>
                <Flex justifyContent="space-between" marginTop='5px' alignItems="center">
                  <Flex flexDirection="column" alignItems='center'> 
                    <Text>IDO Price</Text>
                    <Sub>$0.00117</Sub>
                  </Flex>
                  <Flex flexDirection="column" alignItems='center'>
                    <Text>ATH</Text>
                    <Sub>$0.00117</Sub> 
                  </Flex>
                  <Flex flexDirection="column" alignItems='center'>
                    <Text>Overflow</Text>
                    <Sub>N/A</Sub>
                  </Flex>
                  <Flex flexDirection="column" alignItems='center'>
                    <Text>Net Raised</Text>
                    <Sub>$1.15m</Sub>
                  </Flex>
                </Flex>
              </div>
            </ProjectCard>
            </a>
          </div>
          <a href="https://tranquilitycity.one/">
              <ProjectCard>
                  <div>
                    <Flex justifyContent='left' marginBottom='10px'>
                      <object type="image/svg+xml" data='/images/idoDashboard/lumen.svg' width="30px">&nbsp;</object> 
                      <Title>Tranquility City</Title>
                    </Flex>
                  </div>
                  <div>
                    <Flex justifyContent="space-between" marginTop='5px' alignItems="center">
                      <Flex flexDirection="column" alignItems='center'> 
                        <Text>IDO Price</Text>
                        <Sub>$0.15</Sub>
                      </Flex>
                      <Flex flexDirection="column" alignItems='center'>
                        <Text>ATH</Text>
                        <Sub>$2.05</Sub> 
                      </Flex>
                      <Flex flexDirection="column" alignItems='center'>
                        <Text>Overflow</Text>
                        <Sub>$6m</Sub>
                      </Flex>
                      <Flex flexDirection="column" alignItems='center'>
                        <Text>Net Raised</Text>
                        <Sub>$625k</Sub>
                      </Flex>
                    </Flex>
                  </div>
              </ProjectCard>
              </a>
            <a href="https://app.reverseprotocol.one/">
            <ProjectCard>
              <div>
                <Flex justifyContent='left' marginBottom='10px'>
                  <object type="image/svg+xml" data='/images/idoDashboard/rvrs.svg' width="30px">&nbsp;</object> 
                  <Title>Reverse DAO</Title>
                </Flex>
              </div>
              <div>
                <Flex justifyContent="space-between" marginTop='5px' alignItems="center">
                  <Flex flexDirection="column" alignItems='center'> 
                    <Text>IDO Price</Text>
                    <Sub>$0.4</Sub>
                  </Flex>
                  <Flex flexDirection="column" alignItems='center'>
                    <Text>ATH</Text>
                    <Sub>$14</Sub> 
                  </Flex>
                  <Flex flexDirection="column" alignItems='center'>
                    <Text>Overflow</Text>
                    <Sub>$40m</Sub>
                  </Flex>
                  <Flex flexDirection="column" alignItems='center'>
                    <Text>Net Raised</Text>
                    <Sub>$650k</Sub>
                  </Flex>
                </Flex>
              </div>
            </ProjectCard>
            </a>
          </div>
          <Divider/>
          <div>
          <a href="https://app.artemisprotocol.one/">
            <ProjectCard>
              <div>
                <Flex justifyContent='left' marginBottom='10px'>
                  <object type="image/svg+xml" data='/images/idoDashboard/mis.svg' width="30px">&nbsp;</object> 
                  <Title>Artemis Protocol</Title>
                </Flex>
              </div>
              <div>
                <Flex justifyContent="space-between" marginTop='5px' alignItems="center">
                  <Flex flexDirection="column" alignItems='center'> 
                    <Text>IDO Price</Text>
                    <Sub>$0.3</Sub>
                  </Flex>
                  <Flex flexDirection="column" alignItems='center'>
                    <Text>ATH</Text>
                    <Sub>$6.4</Sub> 
                  </Flex>
                  <Flex flexDirection="column" alignItems='center'>
                    <Text>Overflow</Text>
                    <Sub>$1.5m</Sub>
                  </Flex>
                  <Flex flexDirection="column" alignItems='center'>
                    <Text>Net Raised</Text>
                    <Sub>$150k</Sub>
                  </Flex>
                </Flex>
              </div>
            </ProjectCard>
            </a>
          </div>
        </IdoCard>
      </FlexIdoDashboard>
      </Container>
    </Page>
    
  )
}
export default IDODashboard
