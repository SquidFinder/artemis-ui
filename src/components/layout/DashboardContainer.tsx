import styled from 'styled-components'

const DashboardContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  min-width: 400px;
  max-width: 992px;
  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }

`

export default DashboardContainer
