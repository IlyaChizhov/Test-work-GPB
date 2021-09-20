import React from 'react'
import CalendarTable from './CalendarTable'
import Header from './Header'
import styled from 'styled-components'

const Wrap = styled.div`
  text-align: left;
  padding: 16px;
  max-width: 980px;
  margin: auto;
`

export default function Calendar() {
  return (
    <Wrap>
      <Header />
      <CalendarTable />
    </Wrap>
  )
}
