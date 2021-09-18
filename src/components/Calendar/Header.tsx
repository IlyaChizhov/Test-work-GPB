import React from 'react'
import { Button, FormControl, Select } from '@material-ui/core'
import styled from 'styled-components'
import { Info } from 'luxon'
import { useDispatch, useSelector } from 'react-redux'
import { activeMonthSelector, activeYearSelector, changeActiveDate } from '../../ducks/calendar'
import { DateTypes } from '../../utils'

const Wrap = styled.div`
  display: flex;
  padding: 16px;
  justify-content: flex-end;
  width: 100%;
`

const ControlWrap = styled.div`
  margin-right: 15px;
`

const ButtonGroup = styled.div`
  display: flex;
`
const StyledButton = styled(Button)`
  text-transform: none;
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
          <Select
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
          </Select>
        </FormControl>
      </ControlWrap>

      <ControlWrap>
        <FormControl variant="outlined">
          <Select
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
          </Select>
        </FormControl>
      </ControlWrap>

      <ButtonGroup>
        <StyledButton variant="outlined">Month</StyledButton>
        <StyledButton variant="outlined">Year</StyledButton>
      </ButtonGroup>
    </Wrap>
  )
}
