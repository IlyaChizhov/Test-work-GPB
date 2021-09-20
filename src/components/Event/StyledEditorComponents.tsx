import styled, { css } from 'styled-components'
import { IconButton, Modal, Paper, Select, TextField, Typography } from '@material-ui/core'

export const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledPaper = styled(Paper)`
  width: 500px;
  height: 500px;
  margin: auto;
  position: relative;
  outline: none;
  padding: 25px 16px;
  display: flex;
  flex-direction: column;
`

export const CloseButton = styled(IconButton)`
  position: absolute;
  right: 5px;
  top: 5px;
`

export const shortField = css`
  max-width: 200px;
  margin-bottom: 16px;
`

export const StyledField = styled(TextField)`
  margin-bottom: 16px;
`

export const ShortSelect = styled(Select)`
  ${shortField}
`

export const ShortField = styled(TextField)`
  ${shortField}
`

export const ButtonGroup = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: 16px;
  }
`

export const Title = styled(Typography)`
  margin-bottom: 14px;
`
