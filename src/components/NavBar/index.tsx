import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Toggle, useModal } from '@pancakeswap-libs/uikit'
import { usePriceCakeBusd } from 'state/hooks'
import {Link} from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import UnlockButton from 'components/UnlockButton'
import {Accordion, Button, Card, useAccordionToggle} from 'react-bootstrap';
import { FaChartLine, FaTelegramPlane, FaTwitter, FaDiscord, FaFileAlt, FaGithub, FaTicketAlt, FaChartBar, FaMoneyBillAlt, FaTractor, FaHome, FaPrescriptionBottleAlt, FaTumblrSquare, FaCode, FaFlask, FaBook, FaReddit, FaRocketchat, FaRocket, FaBroadcastTower, FaLayerGroup, FaSeedling, FaExclamationTriangle, FaBootstrap, FaLandmark, FaGamepad, FaCircle, FaParachuteBox, FaVoteYea, FaProjectDiagram, FaShieldAlt, FaFire, FaCloud, FaPlayCircle, FaClipboard, FaUser, FaPlus, FaExpandArrowsAlt, FaExpand, FaExchangeAlt } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import labo from 'config/constants/labo';
import Stats from 'components/NavBar/Stats';
import { getBalanceNumber } from 'utils/formatBalance'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { Address } from 'config/constants/types'
import StatsButton from './StatsButton'



function getWindowDimensions() {
  const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
  return {
    viewportWidth,
    viewportHeight
  };
}

const {viewportWidth, viewportHeight} = getWindowDimensions()
const isOnPhone = viewportWidth < 680
const Price = styled.p`
  -webkit-box-align: center;
  align-items: center;
  background-image: linear-gradient(#555977, #32354D);
  border: 0px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 10px;
  color: #ffff;
  font-size: 14px;
  font-weight: 400;
  width: 100%;
  display: inline-flex;
  min-height: 32px;
  max-height: 37px;
  padding: 10px;
  margin-top: 16px;
  margin-left: 0px;
`

const Balance = styled.p`
  -webkit-box-align: center;
  align-items: center;
  background-image: linear-gradient(#2F324A, #2F324A);
  border: 0px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 10px;
  color: #ffff;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  display: inline-flex;
  min-height: 32px;
  max-height: 37px;
  padding: 10px;
  margin-right: 10px;
  margin-left: -8px;
`

const Chain = styled.p`
  -webkit-box-align: center;
  align-items: center;
  background-color: #213550;
  border: 1px;
  border-style: solid !important;
  border-color: #213550 !important;
  border-radius: 10px;
  color: #0094C6;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  display: inline-flex;
  min-height: 32px;
  max-height: 37px;
  padding: 10px;
  margin-top: 16px;
  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    outline: 0;
    border-color: #FFFF;
    cursor: pointer;
    text-shadow: 0px 0px 10px #0094C6;
  }
`

const Expand = styled.p`
  -webkit-box-align: center;
  align-items: center;
  background-image: linear-gradient(#2F324A, #2F324A);
  border: 1px #2F324A;
  border-style: solid !important;
  border-color: #2F324A !important;
  border-radius: 10px;
  color: #ffff;
  font-size: 14px;
  font-weight: 500;
  width: 120%;
  display: inline-flex;
  min-height: 32px;
  max-height: 37px;
  padding: 10px;
  margin-top: 16px;
  box-shadow: 0px 0px 0px #FFFF;
`

const Quote = styled.p`
    font-size: 15px;
    font-weight: 500;
    text-shadow: 0px 0px 10px #ccc;

    &:hover:not(:disabled),
    &:active:not(:disabled),
    &:focus  {
      outline: 0;
      font-weight: 500;
      cursor: pointer;
      text-shadow: 0px 0px 4px #CCCC;
    }
`

const NavBar = (props) => {
  const { account, connect, reset } = useWallet()
  const cakePriceUsd = usePriceCakeBusd()
  const [isChecked, setIsChecked] = useState(false);
  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress())).toLocaleString('en-us',{ maximumFractionDigits: 2 });

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
        </li>);
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
              <object 
                type="image/svg+xml" 
                data="/images/core/logo2.svg" 
                width="50px" 
                style={{'marginTop': '0px', 'marginBottom': '0px', 'marginRight': '10px'}}>&nbsp;
              </object>
              <ul className="nav-tabs">
                <li className="nav-tab">
                  <Link to="/comingsoon" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                    <Quote>ArtemisPad</Quote>
                  </Link>
                </li>
                <li className="nav-tab">
                  <Link to="/automis" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                    <Quote>Stake</Quote>
                  </Link>
                </li>
                <li className="nav-tab">
                  <Link to="/farm" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                    <Quote>Pools</Quote>
                  </Link>
                </li>
                <li className="nav-tab">
                  <Link to="/incubator" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                    <Quote>Incubator</Quote>
                  </Link>
                </li>
              </ul>
              <ul className="web3buttons">
                <li className="web3li insideMainNav">
                  <Link to="/" className="nav-links connect">
                  { account != null && account.length > 1? 
                    <Price style={{justifyContent:'center'}}>{account.substring(0,( isOnPhone ? 8 : 8)).concat("...")} <p style={{'color': 'white'}}> ✓</p></Price>:
                  <UnlockButton style={{
                    backgroundColor: 'rgb(22, 35, 73) !important',
                    border: '0px',
                    color: '#ffff !important',
                    borderRadius: '10px',
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
                <Chain>Harmony</Chain> 
              </li>
            <li className="web3li">

                { account != null && account.length > 1? 
                  <Price style={{justifyContent:'center'}}> 
                   <Balance>{cakeBalance} MIS</Balance>
                  {account.substring(0,6)}...</Price>
                  :
                <UnlockButton style={{
                  borderRadius: '10px',
                  fontSize: '15px',
                  marginTop: '15px',
                  width: '100%',
                  display: 'inline-flex',
                  padding: '15px',
                  flexFlow: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  'minHeight':'21px',
                  'maxHeight':'37px'
                }}>Connect</UnlockButton>
                }
              </li>

              <li style={{marginTop:'5px'}} className="nav-tab dropdown" id="wheelToggleDesktop">
                  <Expand style={{justifyContent:'center'}}><FaExpand/></Expand>
                <ul className="dropdown-content dropdown-items">
                <li className="nav-tab">
                    <a target="_blanK" rel="noreferrer" href="https://app.defikingdoms.com/#/marketplace?outputCurrency=0xd74433b187cf0ba998ad9be3486b929c76815215" className="nav-links">
                      <span className="dditem"><FaExchangeAlt/> Get MIS</span>
                    </a>
                  </li>
                  <li className="nav-tab">
                    <a target="_blanK" rel="noreferrer" href="https://gov.harmony.one/#/artemis" className="nav-links">
                      <span className="dditem">Governance</span>
                    </a>
                  </li>
                  <li className="nav-tab">
                    <a target="_blanK" rel="noreferrer" href="https://gov.harmony.one/#/artemis" className="nav-links">
                      <span className="dditem">Forum</span>
                    </a>
                  </li>
                  <li className="nav-tab">
                    <a target="_blanK" rel="noreferrer" href="https://discord.gg/7z5qQgnZHE" className="nav-links">
                      <span className="dditem">Discord</span>
                    </a>
                  </li>
                  <li className="nav-tab">
                    <a target="_blanK" rel="noreferrer" href="https://t.me/protocolartemis" className="nav-links">
                      <span className="dditem">Telegram</span>
                    </a>
                  </li>
                  <li className="nav-tab">
                    <a target="_blanK" rel="noreferrer" href="https://twitter.com/ArtemisProtoco1" className="nav-links">
                      <span className="dditem">Twitter</span>
                    </a>
                  </li>
                  <li className="nav-tab">
                    <a target="_blanK" rel="noreferrer" href="https://paladinsec.co/projects/artemis-ifo/" className="nav-links">
                      <span className="dditem">Audit</span>
                    </a>
                  </li>
                  <li className="nav-tab">
                    <a target="_blanK" rel="noreferrer" href="https://artemis-protocol.gitbook.io/artemis/" className="nav-links">
                      <span className="dditem">Docs</span>
                    </a>
                  </li>
                </ul>
              </li>

          </ul>
        </div>
      </header>
    </div>
  )
}


export default NavBar
