import styled from 'styled-components'

const FlexLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 260px;
    max-width: 26%;
    width: 100%;
    margin: 0 6px;
    margin-bottom: 12px;
  }
`

export default FlexLayout
