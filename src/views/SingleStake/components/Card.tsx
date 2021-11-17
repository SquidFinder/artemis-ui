import styled from 'styled-components'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
    background: #2F324A;
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 15px;
    max-width: 440px;
    width: 110%;
    box-shadow: 0px 0px 5px #ccc;
    padding: 10px;
`

export default Card
