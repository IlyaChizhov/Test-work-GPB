import React, { useEffect } from 'react'
import './index.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './components/Routes/Routes'
import Notifications from './components/Notifications/Notifications'
import { useDispatch } from 'react-redux'
import { loadEvents } from './ducks/events'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadEvents())
  }, [dispatch])

  return (
    <>
      <Router>
        <Routes />
      </Router>
      <Notifications />
    </>
  )
}

export default App
