import styled from 'styled-components'

interface IfoCardWrapperProps {
  isSingle?: boolean
}

const IfoCardWrapper = styled.div<IfoCardWrapperProps>`

  border-top: 0px solid ${({ theme }) => theme.colors.textSubtle};
  display: grid;
  grid-template-columns: 20fr;
  grid-gap: 32px;
  padding-bottom: 10px;
  padding-top: 30px;
  

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 10fr;
  }
`

IfoCardWrapper.defaultProps = {
  isSingle: false,
}

export default IfoCardWrapper
