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
import { FaChartLine, FaTelegramPlane, FaTwitter, FaDiscord, FaFileAlt, FaGithub, FaTicketAlt, FaChartBar, FaMoneyBillAlt, FaTractor, FaHome, FaPrescriptionBottleAlt, FaTumblrSquare, FaCode, FaFlask, FaBook, FaReddit, FaRocketchat, FaRocket, FaBroadcastTower, FaLayerGroup, FaSeedling, FaExclamationTriangle, FaBootstrap, FaLandmark, FaGamepad, FaCircle, FaParachuteBox, FaVoteYea, FaProjectDiagram, FaShieldAlt, FaFire, FaCloud, FaPlayCircle, FaClipboard, FaUser } from 'react-icons/fa';
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
border-radius: 10px;
color: #405fb4;
font-size: 15px;
font-weight: 800;
width: 100%;
display: inline-flex;
min-height: 21px;
max-height: 37px;
letter-spacing: 0.03em;
padding: 15px;
margin-top: 10px;
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
          About
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
               <a target="_blanK" rel="noreferrer" href="https://gov.harmony.one/#/artemis" className="nav-links">
                <FaVoteYea />  <span className="dditem">Vote</span>
               </a>
           </li>

            <li>
                                <a target="_blanK" rel="noreferrer" href="https://artemischarts.northeurope.cloudapp.azure.com/" className="nav-links">
                                <FaChartBar />  <span className="dditem">Charts</span>
                                </a>
                              </li>
                <li>
                  <a target="_blanK" rel="noreferrer" href="https://artemis-protocol.gitbook.io/artemis/" className="nav-links">
                    <FaBook /> <span className="dditem">Docs</span>
                  </a>
                </li>
                <li>
                  <a target="_blanK" rel="noreferrer" href="https://github.com/ArtemisProtocol" className="nav-links">
                    <FaCode /> <span className="dditem">Code</span>
                  </a>
                </li>

                <li>
                  <a target="_blanK" rel="noreferrer" href="https://twitter.com/ArtemisProtoco1" className="nav-links">
                    <FaTwitter />  <span className="dditem">Twitter</span>
                  </a>
                </li>

                <li>
                  <a target="_blanK" rel="noreferrer" href="https://t.me/ProtocolArtemis" className="nav-links">
                    <FaTelegramPlane />  <span className="dditem">Telegram</span>
                  </a>
                </li>
                <li>
                  <a target="_blanK" rel="noreferrer" href="https://discord.gg/zqkTCQS8" className="nav-links">
                    <FaDiscord />  <span className="dditem">Disocord</span>
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
                              <span className="dditem">Home</span>
                            </Link>
                          </li>


                          <li className="nav-tab dropdown" id="wheelToggleDesktop">
                            <Link to="/earn" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                              <FaSeedling/> <span className="dditem">Earn</span>
                            </Link>
                            
                            <ul className="dropdown-content dropdown-items">
                            <li>
                              <Link to="/earn" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                                <FaUser />  <span className="dditem">Dashboard</span>
                                </Link>

                              </li>
                            <li className="nav-tab">
                            <Link to="/elysium" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                            <FaCloud/><span className="dditem">Elysium</span>
                            </Link>
                          </li>
 
                              <li>
                              <Link to="/hades" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                                <FaFire />  <span className="dditem">Hades</span>
                                </Link>

                              </li>
                            </ul>
                          </li>


  

                          <li className="nav-tab">
                            <Link to="/incubator" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                            <FaProjectDiagram/><span className="dditem"> Incubator</span>
                            </Link>
                          </li>

 
                          
                          {/* <li className="nav-tab">
                            <Link to="/burnpools" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                            <FaProjectDiagram/><span className="dditem">BURN POOLS</span>
                            </Link>
                          </li> */}

                          <li className="nav-tab">
                            <Link to="/comingsoon" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                            <FaLayerGroup/><span className="dditem"> ArtemisPad</span>
                            </Link>
                          </li>

                        
                          <li className="nav-tab dropdown" id="wheelToggleDesktop">
                            <Link to="/" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                               <FaGamepad/><span className="dditem" >Games</span>
                            </Link>
                            
                            <ul className="dropdown-content dropdown-items">
                            <li className="nav-tab">
                            <Link to="/lottery" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                            <FaTicketAlt/><span className="dditem">Lottery</span>
                            </Link>
                          </li>
 
                              <li>
                                <a target="_blanK" rel="noreferrer" href="https://lootblocks.one/0x39B5Ef29332AFC37D618efE918A7e13c38358f94/11" className="nav-links">
                                <FaParachuteBox />  <span className="dditem">Crates</span>
                                </a>
                              </li>
                            </ul>
                          </li>



                          <li className="nav-tab dropdown" id="infoToggleDesktop">
                            <Link to="/" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                              About
                            </Link>
                            <ul className="dropdown-content dropdown-items">
                            <li>
                                <a target="_blanK" rel="noreferrer" href="https://gov.harmony.one/#/artemis" className="nav-links">
                                <FaVoteYea />  <span className="dditem">Vote</span>
                                </a>
                              </li>

                              <li>
                                <a target="_blanK" rel="noreferrer" href="https://github.com/TechRate/Smart-Contract-Audits/blob/main/October/Artemis%20Protocol.pdf" className="nav-links">
                                <FaShieldAlt />  <span className="dditem">Audit</span>
                                </a>
                              </li>

                            <li>
                                <a target="_blanK" rel="noreferrer" href="https://artemis-protocol.gitbook.io/artemis/" className="nav-links">
                                <FaBook /> <span className="dditem">Docs</span>
                                </a>
                              </li>
                              <li>
                                <a target="_blanK" rel="noreferrer" href="https://github.com/ArtemisProtocol" className="nav-links">
                                  <FaCode /> <span className="dditem">Code</span>
                                </a>
                              </li>
                              <li>
                                <a target="_blanK" rel="noreferrer" href="https://twitter.com/ArtemisProtoco1" className="nav-links">
                                <FaTwitter />  <span className="dditem">Twitter</span>
                                </a>
                              </li>
                              <li>
                                <a target="_blanK" rel="noreferrer" href="https://t.me/protocolartemis" className="nav-links">
                                <FaTelegramPlane /> <span className="dditem">Telegram</span>
                                </a>
                              </li>
                              <li>
                                <a target="_blanK" rel="noreferrer" href="https://discord.gg/7z5qQgnZHE" className="nav-links">
                                <FaDiscord />  <span className="dditem">Discord</span>
                                </a>
                              </li>

                            </ul>
                          </li>
                          <InfoToggle />
                 </ul>
                 <ul className="web3buttons">

                 <li className="web3li insideMainNav">
                    <a target="_blank" rel="noreferrer" style={{'width': '100% !important' }} 
                    href='https://app.defikingdoms.com/' 
                    className="nav-links connect">
                      <Button style={{'fontSize': '15px', 'borderRadius': '10px', 'width': '100% !important', 'backgroundColor': '#4C68EF'}}>
                        <b>Swap</b>
                      </Button>
                    </a>
                  </li>


                 <li className="web3li insideMainNav">
                   <a target="_blank" rel="noreferrer" href="https://info.defikingdoms.com/token/0xd74433b187cf0ba998ad9be3486b929c76815215" className="nav-links price">
                  <Price
                    style={{ marginRight: '4px',
                            backgroundColor: 'transparent' }}
                  >
                    <Token src="images/icon.png" alt='1' width="23px" height="23px"/>
                    <p>{ ( !cakePriceUsd.isNaN() ? cakePriceUsd.toNumber().toFixed(3).concat("$") : '...loading') }</p></Price>
                  </a></li>
   
                <li className="web3li insideMainNav">
                  <Link to="/" className="nav-links connect">
                  { account != null && account.length > 1? 
                    <Price>{account.substring(0,( isOnPhone ? 8 : 8)).concat("...")} <p style={{'color': 'white'}}> ✓</p></Price>:
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
                    <a  target="_blank" rel="noreferrer" style={{'width': '100% !important' }} href='https://app.defikingdoms.com/#/marketplace?outputCurrency=0xd74433b187cf0ba998ad9be3486b929c76815215' className="nav-links connect">
                      <Button style={{'fontSize': '15px', 'borderRadius': '10px', 'borderColor': '#4C68EF', 'width': '100% !important', 'backgroundColor': '#4C68EF', 'marginTop': '10px'}}>
                        <b>Swap</b>
                      </Button>
                    </a>
                </li> 


                <li className="web3li">
                  <a target="_blank" rel="noreferrer" href="https://artemischarts.northeurope.cloudapp.azure.com/" className="nav-links price">
                  <Price 
                    style={{ 
                      marginRight: '0px',
                      marginTop: '10px',
                      'flexFlow': 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Token src="images/icon.png" alt='1' width="23px" height="23px"/>
                    <p>{ ( !cakePriceUsd.isNaN() ? cakePriceUsd.toNumber().toFixed(2).concat("$") : '...loading') }</p></Price>
                  </a></li>

               
                <li className="web3li">
                  <Link to="/" className="nav-links connect">
                  { account != null && account.length > 1? 
                    <Price>{account.substring(0,5)} <p style={{'color': '#4c68ef'}}>...</p></Price>:
                  <UnlockButton style={{
                    backgroundColor: 'rgb(22, 35, 73) !important',
                    border: '0px',
                    color: '#8299dd !important',
                    borderRadius: '15px',
                    fontSize: '15px',
                    fontWeight: '800',
                    marginTop: '10px',
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
