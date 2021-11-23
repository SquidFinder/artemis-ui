import styled from 'styled-components'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
    align-self: baseline;
    background: #2F324A;
    background-image: linear-gradient(#2F324A, #33364D);
    border-radius: 20px;
    border: 2px solid #CECECE;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 30px;
    position: relative;
    text-align: center;
`

export default Card
