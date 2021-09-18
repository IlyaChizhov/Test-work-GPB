import React from 'react'
import { DateTime } from 'luxon'
import { TableCell } from '@material-ui/core'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { DATE_FORMAT } from '../../utils'

const StyledCell = styled(TableCell)`
  //background-color: red;
`

interface Props {
  day: DateTime
}

export default function CalendarCell({ day }: Props) {
  return (
    <StyledCell>
      <div>
        <Link to={`/day/${day.toFormat(DATE_FORMAT)}`}>{day.day}</Link>
      </div>
    </StyledCell>
  )
}
