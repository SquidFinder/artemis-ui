import React from 'react'
import styled from 'styled-components'
import { Flex, } from '@pancakeswap-libs/uikit'
import { Link } from 'react-router-dom'
import Page from 'components/layout/Page'
import { Container } from 'react-bootstrap'

import { FaArrowRight } from 'react-icons/fa'
import FlexIdoDashboard from 'components/layout/FlexIdoDashboard'


const FlexUpcoming = styled.div`
display: flex;
justify-content: center;
flex-wrap: wrap;
margin-bottom: 5px;

& > * {
  min-width: 750px;
  max-width: 34%;
  width: 100%;
  margin: 0 7.5px;
  margin-bottom: 15px;
}
`

const IdoCard = styled.div`
  align-self: baseline;
  background-image: linear-gradient(#2F324A, #33364D);
  border-radius: 20px;
  border: 2px solid #CECECE;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0px;
  position: relative;
  text-align: center;
`

const ProjectCard = styled.div`
  align-self: baseline;
  background-image: linear-gradient(#2F324A, #2F324A);
  border-radius: 20px;
  border: 0px solid #CECECE;
  display: flex;
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

const Title = styled.p`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 0px;
  text-shadow: 0px 0px 0px #ccc;
  color: #ffff;
  margin-left: 8px;
  margin-top: 8px;

  align-items: center;
`

const Description = styled.p`
  font-size: 13px;
  font-weight: 200;
  margin-bottom: 0px;
  text-shadow: 0px 0px 0px #ccc;
  color: #ffff;
  margin-top: 8px;
`

const Upcoming: React.FC = () => {
  return (
    <FlexUpcoming>
      <IdoCard>
        <Link to="/" className="nav-links">
          <ProjectCard>
            <Flex justifyContent='space-between'>
              <Flex justifyContent='left'>
                <object type="image/svg+xml" data='/images/idoDashboard/lumen.svg' width="30px">&nbsp;</object>
                <Title>SlothFi</Title>
              </Flex>
              <Flex justifyContent='right'>
                <Description>TBA</Description>
              </Flex>
            </Flex>
          </ProjectCard>
        </Link>
        <Link to="/" className="nav-links">
        <ProjectCard>
            <Flex justifyContent='space-between'>
              <Flex justifyContent='left'>
                <object type="image/svg+xml" data='/images/idoDashboard/lumen.svg' width="30px">&nbsp;</object>
                <Title>Xenon Finance</Title>
              </Flex>
              <Flex justifyContent='right'>
                <Description>TBA</Description>
              </Flex>
            </Flex>
          </ProjectCard>
        </Link>
        <Link to="/" className="nav-links">
          <ProjectCard>
            <Flex justifyContent='space-between'>
              <Flex justifyContent='left'>
                <object type="image/svg+xml" data='/images/idoDashboard/lumen.svg' width="30px">&nbsp;</object>
                <Title>Immortl ONE</Title>
              </Flex>
              <Flex justifyContent='right'>
                <Description>Dec. 21</Description>&nbsp;&nbsp;&nbsp;
                <Description>Tiers 500/5000/10,000 MIS</Description>
              </Flex>
            </Flex>
          </ProjectCard>
        </Link>
      </IdoCard>
    </FlexUpcoming>
  )
}
export default Upcoming