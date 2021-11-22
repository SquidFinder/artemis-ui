import styled from 'styled-components'

const FlexLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 260px;
    max-width: 35%;
    width: 100%;
    margin: 0 12px;
    margin-bottom: 15px;
  }
`

export default FlexLayout
