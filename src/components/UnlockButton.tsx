import React from 'react'
import { Button, useWalletModal } from '@pancakeswap-libs/uikit'
import ReactTooltip from 'react-tooltip';
import labo from 'config/constants/labo'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components';
import { FaWallet } from 'react-icons/fa';

const StyledBtn = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-color: #292C44;
  border: 0px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 5px;
  color: #FFFF;
  font-size: 15px;
  font-weight: 400;
  width: 100%;
  display: inline-flex;
  min-height: 18px;
  max-height: 30px;
  max-width: 150px;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
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
