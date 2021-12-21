import styled from 'styled-components'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
align-self: baseline;
background-image: linear-gradient(#2F324A, #33364D);
border-radius: 20px;
border: 2px solid #CECECE;
display: flex;
flex-direction: column;
justify-content: space-around;
position: relative;
text-align: center;
&:hover:not(:disabled),
&:active:not(:disabled),
&:focus  {
  outline: 0;
  border-color: #FFFF;
  box-shadow: 0px 0px 3px #cccc;
}
`

export default Card
