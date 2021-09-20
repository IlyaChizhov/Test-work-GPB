import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { useHistory, useRouteMatch, Switch, Route, Link } from 'react-router-dom'
import EventEditor from '../Event/EventEditor'
import EventList from '../EventList/EventList'
import DeleteEvent from '../Event/DeleteEvent'
import { primaryColor } from '../../styles/variables'

const Wrap = styled.div`
  padding: 16px;
  max-width: 980px;
  margin: auto;
`

const StyledButton = styled(Button)`
  text-transform: none;
  background-color: ${primaryColor};
  padding: 8px 30px;
  font-weight: 600;
`

const Icon = styled(Add)`
  margin-right: 10px;
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`

export default function Day() {
  const history = useHistory()
  const { url } = useRouteMatch()

  const openNewEventModal = () => {
    history.push(`${url}/event/new`)
  }

  return (
    <Wrap>
      <Buttons>
        <StyledButton onClick={openNewEventModal} color="primary" variant="contained">
          <Icon /> Новое событие
        </StyledButton>

        <Link to="/">Вернуться в календарь</Link>
      </Buttons>

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
