import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Day from '../Day/Day'
import Calendar from '../Calendar/Calendar'

export default function Routes() {
  return (
    <>
      <Route exact path="/">
        <Calendar />
      </Route>
      <Switch>
        <Route exact path="/day/:day">
          <Day />
        </Route>
      </Switch>
    </>
  )
}
