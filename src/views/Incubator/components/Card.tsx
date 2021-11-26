import styled from 'styled-components'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  align-self: baseline;
  background: #2F324A;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 35px;
  position: relative;
  text-align: center;
  box-shadow: 0px 0px 3px #fff;
`

export default Card
