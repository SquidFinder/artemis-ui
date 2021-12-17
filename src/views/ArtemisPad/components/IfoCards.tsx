import styled from 'styled-components'

interface IfoCardWrapperProps {
  isSingle?: boolean
}

const IfoCardWrapper = styled.div<IfoCardWrapperProps>`
  display: grid;
  grid-template-columns: 20fr;
  grid-gap: 32px;
  padding-bottom: 0px;
  padding: 15px;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 10fr;
  }
`

IfoCardWrapper.defaultProps = {
  isSingle: false,
}

export default IfoCardWrapper
