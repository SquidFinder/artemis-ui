import styled from 'styled-components'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
align-self: baseline;
background: #2F324A;
border-radius: 15px;
display: flex;
flex-direction: column;
justify-content: space-around;
padding: 15px;
position: relative;
text-align: center;
max-width: 730px;

border:0px solid #fff;
box-shadow: 1px 1px 5px #ccc;
`

export default Card
