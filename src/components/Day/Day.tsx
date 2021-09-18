import React from 'react'
import { useParams } from 'react-router'
import { DateTime } from 'luxon'
import { DATE_FORMAT } from '../../utils'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom'
import NewEvent from '../Event/NewEvent'

const Wrap = styled.div`
  padding: 16px;
`

const StyledButton = styled(Button)`
  text-transform: none;
`

export default function Day() {
  const { day } = useParams<{ day: string }>()
  const history = useHistory()
  const { url } = useRouteMatch()

  const openNewEventModal = () => {
    history.push(`${url}/event/new`)
  }

  console.log(DateTime.fromFormat(day, DATE_FORMAT))

  return (
    <Wrap>
      <StyledButton onClick={openNewEventModal} color="primary" variant="contained">
        <Add /> New Event
      </StyledButton>

      <Switch>
        <Route path="/day/:day/event/new">
          <NewEvent />
        </Route>
      </Switch>
    </Wrap>
  )
}
