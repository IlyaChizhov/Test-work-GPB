import React from 'react'
import CalendarTable from './CalendarTable'
import Header from './Header'
import styled from 'styled-components'

const Wrap = styled.div`
  text-align: left;
`

export default function Calendar() {
  return (
    <Wrap>
      <Header />
      <CalendarTable />
    </Wrap>
  )
}
