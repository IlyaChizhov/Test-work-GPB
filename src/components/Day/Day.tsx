import React from 'react'
import { useParams } from 'react-router'
import { DateTime } from 'luxon'
import { DATE_FORMAT } from '../../utils'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { Add } from '@material-ui/icons'

const Wrap = styled.div`
  padding: 16px;
`

export default function Day() {
  const { day } = useParams<{ day: string }>()

  console.log(DateTime.fromFormat(day, DATE_FORMAT))

  return (
    <Wrap>
      <Button variant="contained">
        <Add /> New Event
      </Button>
      Test render!!!
    </Wrap>
  )
}
