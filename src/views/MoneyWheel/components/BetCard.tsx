import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Flex, Heading } from '@pancakeswap-libs/uikit'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import { MoneyWheelBet } from 'config/constants/types'
import BetInput from './BetInput'
import BetActions from './BetActions'

interface BetCardProps {
    max: BigNumber
    tokenName?: string
    onResult: (lastResult : any) => void
  }

const BetCard: React.FC<BetCardProps> = ({max, tokenName = '', onResult}) => {
    const TranslateString = useI18n()
    const initialBetState = {
        val1: "",
        val3: "",
        val5: "",
        val10: "",
        val20: "",
        val50: ""
    }

    console.log("optimize me!")

    const [bet, setBet] = useState(initialBetState)

    const handleChange = (evt) => {
        setBet({
        ...bet,
        [evt.target.name]: evt.target.value
        });
    }

    const handleSelectMax = (evt) => {
        const maxBet = new BigNumber(fullBalance).toString()  
        setBet({
          ...initialBetState,
          [evt.target.name]: maxBet
        });
    }

    const fullBalance = useMemo(() => {
        return getFullDisplayBalance(max)
      }, [max])

    return (
        <div>


            <Heading as="h1" size="lg" color="#4C68EF" mt='30px' mb="50px" style={{ textAlign: 'center' }}>
                {fullBalance.toLocaleString()} {tokenName} {TranslateString(526, 'Available')}
            </Heading>
            <Flex>
                <BetInput
                    onChange={handleChange}
                    onSelectMax={handleSelectMax}
                    value={bet.val50}
                    max={fullBalance}
                    symbol={tokenName}
                    betNumber="50"
                    name="val50"
                />
                <BetInput
                    onChange={handleChange}
                    onSelectMax={handleSelectMax}
                    value={bet.val20}
                    max={fullBalance}
                    symbol={tokenName}
                    betNumber="20"
                    name="val20"
                />
                <BetInput
                    onChange={handleChange}
                    onSelectMax={handleSelectMax}
                    value={bet.val10}
                    max={fullBalance}
                    symbol={tokenName}
                    betNumber="10"
                    name="val10"
                />
            </Flex>
            <Flex>
                <BetInput
                    onChange={handleChange}
                    onSelectMax={handleSelectMax}
                    value={bet.val5}
                    max={fullBalance}
                    symbol={tokenName}
                    betNumber="5"
                    name="val5"
                />
                <BetInput
                    onChange={handleChange}
                    onSelectMax={handleSelectMax}
                    value={bet.val3}
                    max={fullBalance}
                    symbol={tokenName}
                    betNumber="3"
                    name="val3"
                />
                <BetInput
                    onChange={handleChange}
                    onSelectMax={handleSelectMax}
                    value={bet.val1}
                    max={fullBalance}
                    symbol={tokenName}
                    betNumber="1"
                    name="val1"
                />               
            </Flex>
            <BetActions bet={bet} onResult={onResult}/>

        </div>
    )
}

export default BetCard