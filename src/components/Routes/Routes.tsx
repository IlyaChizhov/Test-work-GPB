import React from 'react'
import { Route } from 'react-router-dom'
import Day from '../Day/Day'
import Calendar from '../Calendar/Calendar'

export default function Routes() {
  return (
    <>
      <Route exact path="/">
        <Calendar />
      </Route>
      <Route path="/day/:day">
        <Day />
      </Route>
    </>
  )
}
