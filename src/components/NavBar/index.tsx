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
  border: 0px;
  border-style: solid !important;
  border-color: #405fb4 !important;
  border-radius: 10px;
  color: #ffff;
  font-size: 14px;
  font-weight: 400;
  width: 90%;
  display: inline-flex;
  min-height: 21px;
  max-height: 33px;
  letter-spacing: 0.03em;
  padding: 15px;
  margin-top: 16px;
  margin-left: 10px;
  box-shadow: 0px 0px 5px

`

const Quote = styled.p`
    font-size: 15px;
    font-weight: 500;
    text-shadow: 0px 0px 5px #ccc;
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
              data="/images/core/logo.svg" 
              width="50px" 
              style={{'marginTop': '0px', 
                      'marginBottom': '0px', 
                      'marginRight': '10px'}}>&nbsp;</object>

              <ul className="nav-tabs">
                <li className="nav-tab">
                  <Link to="/artemispad" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                    <Quote>ArtemisPad</Quote>
                  </Link>
                </li>

                <li className="nav-tab">
                  <Link to="/farm" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                    <Quote>Farm</Quote>
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
                    <Price>{account.substring(0,( isOnPhone ? 8 : 8)).concat("...")} <p style={{'color': 'white'}}> ✓</p></Price>:
                  <UnlockButton style={{
                    backgroundColor: 'rgb(22, 35, 73) !important',
                    border: '0px',
                    color: '#ffff !important',
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
                  <Link to="/" className="nav-links connect">
                  { account != null && account.length > 1? 
                    <Price>{account.substring(0,6)} <p style={{'color': '#fff'}}>...</p></Price>:
                  <UnlockButton style={{
                    backgroundColor: 'rgb(22, 35, 73) !important',
                    border: '0px',
                    color: '#ffff !important',
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
