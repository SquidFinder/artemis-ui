import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Toggle } from '@pancakeswap-libs/uikit'
import { usePriceCakeBusd } from 'state/hooks'
import {Link} from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import UnlockButton from 'components/UnlockButton'
import {Accordion, Button, Card, useAccordionToggle} from 'react-bootstrap';
import { FaChartLine, FaTelegramPlane, FaTwitter, FaDiscord, FaFileAlt, FaGithub, FaTicketAlt, FaChartBar, FaMoneyBillAlt, FaTractor, FaHome, FaPrescriptionBottleAlt, FaTumblrSquare, FaCode, FaFlask, FaBook, FaReddit, FaRocketchat, FaRocket, FaBroadcastTower, FaLayerGroup, FaSeedling, FaExclamationTriangle, FaBootstrap, FaLandmark, FaGamepad, FaCircle, FaParachuteBox, FaVoteYea, FaProjectDiagram } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import labo from 'config/constants/labo';

function getWindowDimensions() {
  const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
  return {
    viewportWidth,
    viewportHeight
  };
}

const {viewportWidth, viewportHeight} = getWindowDimensions()

const isOnPhone = viewportWidth < 680

const Token = styled.img`
  margin-right: 10px;
`

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

const Logo = styled.p`
  font-size: 30px;
  color: #4c68ef !important;
  padding-bottom: 0px;
  @media screen and (max-width: 800px) {
    font-size: 21px;
  }
`

const Sub = styled.p`
  font-size: 13px;
  color: #1F2237;
`


const NavBar = (props) => {
  const { account, connect, reset } = useWallet()
  const cakePriceUsd = usePriceCakeBusd()
  const [isChecked, setIsChecked] = useState(false);

  const LightSwitch = () => {
  
    const toggle = () => setIsChecked(!isChecked);
  
    return (
      <>
        <div style={{ marginBottom: "32px" }}>
          <Toggle checked={isChecked} onChange={toggle} />
        </div>
      </>
    );
  }

  function CustomToggle({ eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey);
  
    return (
        <li className="nav-tab dropdown">
        <Link to="/" className="nav-links" onClick={decoratedOnClick}>
          ABOUT
        </Link>
        </li>
    );
  }
  
  function InfoToggle() {
    return (
      <Accordion id="infoToggleMobile">
        <Card style={{"backgroundColor": "#161616", "border": "0"}}>
          <Card.Header style={{"backgroundColor": "#161616", "border": "0"}}>
            <CustomToggle eventKey="0" />
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body style={{"backgroundColor": "#161616", "border": "0"}}>
            <ul className="dropdown-items">

                <li>
                  <a target="_blanK" rel="noreferrer" href="https://artemisprotocol.gitbook.io/artemis/" className="nav-links">
                    <FaBook /> <span className="dditem">DOCS</span>
                  </a>
                </li>
                <li>
                  <a target="_blanK" rel="noreferrer" href="https://github.com/ArtemisProtocol" className="nav-links">
                    <FaCode /> <span className="dditem">CODE</span>
                  </a>
                </li>

                <li>
                  <a target="_blanK" rel="noreferrer" href="https://twitter.com/ArtemisProtoco1" className="nav-links">
                    <FaTwitter />  <span className="dditem">TWITTER</span>
                  </a>
                </li>

                <li>
                  <a target="_blanK" rel="noreferrer" href="https://t.me/ProtocolArtemis" className="nav-links">
                    <FaTelegramPlane />  <span className="dditem">TELEGRAM</span>
                  </a>
                </li>
                <li>
                  <a target="_blanK" rel="noreferrer" href="https://discord.gg/zqkTCQS8" className="nav-links">
                    <FaDiscord />  <span className="dditem">DISCORD</span>
                  </a>
                </li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }


  return (
    <div>
      <header>
          <div className="nav-wrapper">


              <nav>
                  <input className="hidden" type="checkbox" checked={isChecked} id="menuToggle"/>
                  <button type="button" className="menu-btn" onClick={()=>{setIsChecked(!isChecked)}}>
                      <div className="menu"/>
                      <div className="menu"/>
                      <div className="menu"/>
                  </button>
                  <div className="nav-container">
                      <ul className="nav-tabs">
                          <li className="nav-tab">
                            <Link to="/" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                              <span className="dditem">HOME</span>
                            </Link>
                          </li>

                          <li className="nav-tab">
                            <Link to="/earn" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                            <FaSeedling /><span className="dditem">EARN</span>
                            </Link>
                          </li>

                          <li className="nav-tab">
                            <Link to="/incubator" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                            <FaProjectDiagram/><span className="dditem">INCUBATOR</span>
                            </Link>
                          </li>

                          <li className="nav-tab">
                            <Link to="/artemispad" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                            <FaRocket/><span className="dditem">ARTEMISPAD</span>
                            </Link>
                          </li>
                        

                          <li className="nav-tab dropdown" id="wheelToggleDesktop">
                            <Link to="/" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                              <FaGamepad/> <span className="dditem">GAMES</span>
                            </Link>
                            
                            <ul className="dropdown-content dropdown-items">
                            <li className="nav-tab">
                            <Link to="/lottery" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                            <FaTicketAlt/><span className="dditem">LOTTERY</span>
                            </Link>
                          </li>
                             <li>
                                <Link to="/launch" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                                <FaCircle/><span className="dditem">WHEEL</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/launch" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                                <FaParachuteBox/><span className="dditem">CRATES</span>
                                </Link>
                              </li>
                            </ul>
                          </li>

                          <li className="nav-tab">
                            <Link to="/governance" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                            <FaVoteYea/><span className="dditem">VOTE</span>
                            </Link>
                          </li>

                          <li className="nav-tab dropdown" id="infoToggleDesktop">
                            <Link to="/" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                              ABOUT
                            </Link>
                            <ul className="dropdown-content dropdown-items">

                            <li>
                                <a target="_blanK" rel="noreferrer" href="https://artemisprotocol.gitbook.io/artemis/" className="nav-links">
                                <FaBook /> <span className="dditem">DOCS</span>
                                </a>
                              </li>
                              <li>
                                <a target="_blanK" rel="noreferrer" href="https://github.com/ArtemisProtocol" className="nav-links">
                                  <FaCode /> <span className="dditem">CODE</span>
                                </a>
                              </li>
                              <li>
                                <a target="_blanK" rel="noreferrer" href="https://twitter.com/ArtemisProtoco1" className="nav-links">
                                <FaTwitter />  <span className="dditem">TWITTER</span>
                                </a>
                              </li>
                              <li>
                                <a target="_blanK" rel="noreferrer" href="https://t.me/protocolartemis" className="nav-links">
                                <FaTelegramPlane /> <span className="dditem">TELEGRAM</span>
                                </a>
                              </li>
                              <li>
                                <a target="_blanK" rel="noreferrer" href="https://discord.gg/7z5qQgnZHE" className="nav-links">
                                <FaDiscord />  <span className="dditem">DISCORD</span>
                                </a>
                              </li>

                            </ul>
                          </li>
                          <InfoToggle />
                 </ul>
                 <ul className="web3buttons">
                 <li className="web3li insideMainNav">
                   <a target="_blank" rel="noreferrer" href="https://info.defikingdoms.com/token/0xd74433b187cf0ba998ad9be3486b929c76815215" className="nav-links price">
                  <Price
                    style={{ marginRight: '4px',
                            backgroundColor: 'transparent' }}
                  >
                    <Token src="images/icon.svg" alt='1' width="30px" height="30px"/>
                    <p>{ ( !cakePriceUsd.isNaN() ? cakePriceUsd.toNumber().toFixed(5).concat("$") : '...loading') }</p></Price>
                  </a></li>
                  <li className="web3li insideMainNav">
                    <a target="_blank" rel="noreferrer" style={{'width': '100% !important' }} 
                    href='https://app.defikingdoms.com/' 
                    className="nav-links connect">
                      <Button style={{'fontSize': '15px', 'borderRadius': '16px', 'width': '100% !important'}}>
                        <b>Swap</b>
                      </Button>
                    </a>
                  </li>
                <li className="web3li insideMainNav">
                  <Link to="/" className="nav-links connect">
                  { account != null && account.length > 1? 
                    <Price>{account.substring(0,( isOnPhone ? 3 : 8)).concat("...")} <p style={{'color': 'blue'}}>Connected</p></Price>:
                  <UnlockButton style={{
                    backgroundColor: 'rgb(22, 35, 73) !important',
                    border: '0px',
                    color: '#8299dd !important',
                    borderRadius: '16px',
                    fontSize: '15px',
                    fontWeight: '800',
                    width: '100%',
                    display: 'inline-flex',
                    height: '44px',
                    letterSpacing: '0.03em',
                    padding: '15px',
                    minHeight: '21px',
                    maxHeight: '33px',
                  }}>Connect</UnlockButton>
                  }
                  </Link>
                  </li>
                 </ul>
                  </div>
              </nav>
              <ul className="nav-tabs outsideMainNav">

              
              <li className="web3li">
                    <a target="_blank" rel="noreferrer" style={{'width': '100% !important' }} href='https://game.defikingdoms.com/#/marketplace?outputCurrency=0xd74433b187cf0ba998ad9be3486b929c76815215' className="nav-links connect">
                      <Button style={{'fontSize': '15px', 'borderRadius': '15px', 'width': '100% !important'}}>
                        <b>Swap</b>
                      </Button>
                    </a>
               </li>


                <li className="web3li">
                  <a target="_blank" rel="noreferrer" href="https://info.defikingdoms.com/token/0xd74433b187cf0ba998ad9be3486b929c7681521" className="nav-links price">
                  <Price
                    style={{ 
                      marginRight: '0px',
                      'flexFlow': 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
   
                    <p>{ ( !cakePriceUsd.isNaN() ? cakePriceUsd.toNumber().toFixed(5).concat("$") : '...loading') }</p></Price>
                  </a></li>

               
                <li className="web3li">
                  <Link to="/" className="nav-links connect">
                  { account != null && account.length > 1? 
                    <Price>{account.substring(0,8).concat("...")} <p style={{'color': '#4c68ef'}}> ✓</p></Price>:
                  <UnlockButton style={{
                    backgroundColor: 'rgb(22, 35, 73) !important',
                    border: '0px',
                    color: '#8299dd !important',
                    borderRadius: '15px',
                    fontSize: '15px',
                    fontWeight: '800',
                    width: '100%',
                    display: 'inline-flex',
                    letterSpacing: '0.03em',
                    padding: '15px',
                    flexFlow: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    'minHeight':'21px',
                    'maxHeight':'37px'
                  }}>Connect</UnlockButton>
                  }
                  </Link>
                  </li>
              </ul>
          </div>
      </header>
  </div>
  )
}


export default NavBar
