import React from 'react'
import styled from 'styled-components'

import Spacer from '../Spacer'

const ModalActions: React.FC = ({ children }) => {
  const l = React.Children.toArray(children).length
  return (
    <StyledModalActions>
      {React.Children.map(children, (child, i) => (
        <>
          <StyledModalAction>{child}</StyledModalAction>
          {i < l - 1 && <Spacer />}
        </>
      ))}
    </StyledModalActions>

  )
}

const StyledModalActions = styled.div`
  align-items: center;
  background-color: #2F324A;
  display: flex;
  margin: 0;
  padding: 10px;
  padding-left: 50px;
  padding-right: 50px;
`

const StyledModalAction = styled.div`
  background-color: #2F324A;
  flex: 1;
  text-align: center;
`

export default ModalActions
