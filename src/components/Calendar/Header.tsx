import React from 'react'
import { FormControl } from '@material-ui/core'
import styled from 'styled-components'
import { Info } from 'luxon'
import { useDispatch, useSelector } from 'react-redux'
import { activeMonthSelector, activeYearSelector, changeActiveDate } from '../../ducks/calendar'
import { DateTypes } from '../../utils'
import {
  ButtonGroup,
  ControlWrap,
  StyledButtonLeft,
  StyledButtonRight,
  StyledSelect,
} from './StyledCalendarComponents'

const Wrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

const hardcodedYears = [2020, 2021, 2022, 2023, 2024]

const months = Info.months('short', { locale: 'en-US' }).map((month, index) => ({
  title: month,
  monthInYear: index + 1, //luxon starts months from 1
}))

export default function Header() {
  const activeMonth = useSelector(activeMonthSelector)
  const activeYear = useSelector(activeYearSelector)
  const dispatch = useDispatch()

  const handleChangeSelect =
    (type: DateTypes) =>
    ({ target: { value } }: any) =>
      dispatch(changeActiveDate({ key: type, date: Number(value) }))

  return (
    <Wrap>
      <ControlWrap>
        <FormControl variant="outlined">
          <StyledSelect
            native
            value={activeYear}
            onChange={handleChangeSelect('year')}
            inputProps={{
              name: 'year',
              id: 'year',
            }}
          >
            {hardcodedYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </StyledSelect>
        </FormControl>
      </ControlWrap>

      <ControlWrap>
        <FormControl variant="outlined">
          <StyledSelect
            native
            value={activeMonth}
            onChange={handleChangeSelect('month')}
            inputProps={{
              name: 'month',
              id: 'month',
            }}
          >
            {months.map(({ title, monthInYear }) => (
              <option key={title} value={monthInYear}>
                {title}
              </option>
            ))}
          </StyledSelect>
        </FormControl>
      </ControlWrap>

      <ButtonGroup>
        <StyledButtonLeft color="primary" variant="outlined">
          Month
        </StyledButtonLeft>
        <StyledButtonRight variant="outlined">Year</StyledButtonRight>
      </ButtonGroup>
    </Wrap>
  )
}
