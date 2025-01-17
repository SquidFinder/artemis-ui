import styled from 'styled-components'

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 992px;
  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    margin: 40px;
    margin-top: 15px;
  }
`

export default Container
