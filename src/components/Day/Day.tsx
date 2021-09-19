import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom'
import EventEditor from '../Event/EventEditor'
import EventList from '../EventList/EventList'
import DeleteEvent from '../Event/DeleteEvent'

const Wrap = styled.div`
  padding: 16px;
`

const StyledButton = styled(Button)`
  text-transform: none;
`

export default function Day() {
  const history = useHistory()
  const { url } = useRouteMatch()

  const openNewEventModal = () => {
    history.push(`${url}/event/new`)
  }

  return (
    <Wrap>
      <StyledButton onClick={openNewEventModal} color="primary" variant="contained">
        <Add /> New Event
      </StyledButton>

      <EventList />

      <Switch>
        <Route path="/day/:day/event/new">
          <EventEditor type="new" />
        </Route>
        <Route path="/day/:day/event/:eventId/edit">
          <EventEditor type="edit" />
        </Route>
        <Route path="/day/:day/event/:eventId/delete">
          <DeleteEvent />
        </Route>
      </Switch>
    </Wrap>
  )
}
