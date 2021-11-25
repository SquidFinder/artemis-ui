import React from 'react'
import { Button, useWalletModal } from '@pancakeswap-libs/uikit'
import ReactTooltip from 'react-tooltip';
import labo from 'config/constants/labo'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components';
import { FaWallet } from 'react-icons/fa';

const StyledBtn = styled.button`
display: inline-flex;
align-items: center;
background-image: linear-gradient(#2F324A, #2F324A);
border-radius: 10px;
border: 1px solid #CECECE;
height: 42px;
width: 200px;
color: #FFFF;
font-size: 13.5px;
font-weight: 400;
padding: 15px;
margin-top: 0px;  
margin-bottom: 0px;
&:hover:not(:disabled),
&:active:not(:disabled),
&:focus  {
  outline: 0;
  border-color: #FFFF;
  cursor: pointer;
  box-shadow: 0px 0px 2px #fff;
  text-shadow: 0px 0px 10px #fff;
}
`

const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <span>
      <StyledBtn
        style={{ justifyContent:"center" }}
        disabled={ labo.isLocked.unlockWalletButton } 
        onClick={onPresentConnectModal} {...props}>
        {TranslateString(2192, 'Connect')}&nbsp;<FaWallet/>
      </StyledBtn>
    </span>
  )
}

export default UnlockButton
