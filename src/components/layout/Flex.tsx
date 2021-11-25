import styled from 'styled-components'

const FlexLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 260px;
    max-width: 34%;
    width: 100%;
    margin: 0 7.5px;
    margin-bottom: 15px;
    margin-top: 15px;
  }
`

export default FlexLayout
