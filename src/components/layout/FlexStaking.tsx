import styled from 'styled-components'

const FlexStaking = styled.div`
display: flex;
justify-content: center;
flex-wrap: wrap;
& > * {
  min-width: 340px;
  max-width: 34%;
  width: 100%;
  margin: 0 7.5px;
  margin-bottom: 15px;
}
`

export default FlexStaking