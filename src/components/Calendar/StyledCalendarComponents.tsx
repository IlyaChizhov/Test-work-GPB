import styled, { css } from 'styled-components'
import { Button, Select, TableCell } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {
  borderColor,
  lightBlue,
  lightBorderColor,
  lightGray,
  primaryColor,
} from '../../styles/variables'
import { withModifier } from '../../styles/helpers'

export const StyledCell = styled(TableCell)`
  text-align: right;
  padding: 2px 8px;
  border: none;
  width: 70px;
  height: 100px;
  max-width: 70px;
`

export const StyledLink = styled(Link)`
  min-height: 105px;
  border-top: 2px solid ${borderColor};
  display: block;
  font-size: 17px;
  padding: 5px;
  color: inherit;
  text-decoration: none;
  position: relative;

  ${withModifier<{ $isToday?: boolean; $isOutOfMonth?: boolean }>(
    '$isToday',
    css`
      border-top: 2px solid ${primaryColor};
      color: ${primaryColor};
      background-color: ${lightBlue};
    `
  )}

  ${withModifier<{ $isToday?: boolean; $isOutOfMonth?: boolean }>(
    '$isOutOfMonth',
    css`
      border-top: 2px solid ${lightBorderColor};
      color: ${borderColor};
      background-color: ${lightGray};
    `
  )}
`

export const EventWrap = styled.div`
  text-align: left;
  width: 100%;
  overflow: auto;
  max-height: 68px;
`

export const Event = styled.div`
  padding-left: 5px;
  margin-bottom: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
`

export const Round = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 4px;
  background-color: green;
  flex-shrink: 0;
`

export const Text = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const StyledSelect = styled(Select)`
  select {
    padding: 12px 35px 12px 20px;
    font-weight: 500;
  }
`

export const ControlWrap = styled.div`
  margin-right: 15px;
`

export const ButtonGroup = styled.div`
  display: flex;
`
export const StyledButtonRight = styled(Button)`
  text-transform: none;
  font-size: 17px;
  border-radius: 0 4px 4px 0;
  font-weight: 500;
  border-left: none;

  &:hover {
    border-left: none;
  }
`

export const StyledButtonLeft = styled(Button)`
  text-transform: none;
  font-size: 17px;
  border-radius: 4px 0 0 4px;
  font-weight: 500;
`
