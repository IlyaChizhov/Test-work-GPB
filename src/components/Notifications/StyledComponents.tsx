import styled from 'styled-components'
import { IconButton, Paper } from '@material-ui/core'

export const StyledPaper = styled(Paper)`
  position: relative;
  padding: 12px 16px;
  margin-top: 15px;
  display: flex;
  align-items: center;
`
export const CloseButton = styled(IconButton)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 6px;

  svg {
    width: 15px;
    height: 15px;
  }
`

export const Message = styled.div`
  font-size: 17px;
  font-weight: 500;
  display: flex;
  align-items: center;
`
