import React from 'react'
import { Button } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { CalendarEvent } from '../../utils'
import { convertToTime } from '../../utils'
import useEventEditor from './useEventEditor'
import {
  ButtonGroup,
  CloseButton,
  ShortField,
  ShortSelect,
  StyledField,
  StyledModal,
  StyledPaper,
  Title,
} from './StyledEditorComponents'

export const remindsInterval = [5, 15, 30, 60]

interface Props {
  type: 'new' | 'edit'
  event?: CalendarEvent
}

export default function EventEditor({ type = 'new' }: Props) {
  const { event, submit, handleTimeChange, closeModal, handleChange } = useEventEditor(type)

  return (
    <StyledModal open={true} onClose={closeModal}>
      <StyledPaper>
        <CloseButton onClick={closeModal}>
          <Close />
        </CloseButton>

        <Title variant="h5">{type === 'new' ? 'Добавьте новое событие' : 'Измените событие'}</Title>

        <StyledField
          required
          value={event['title']}
          label="Название события"
          variant="outlined"
          onChange={({ target: { value } }) => handleChange('title', value)}
        />
        <ShortField
          required
          type="time"
          value={convertToTime(event['startTime'])}
          label="Начало события"
          variant="outlined"
          onChange={handleTimeChange('startTime')}
        />
        <ShortField
          required
          type="time"
          value={convertToTime(event['endTime'])}
          label="Окончание события"
          variant="outlined"
          onChange={handleTimeChange('endTime')}
        />
        <ShortSelect
          native
          required
          variant="outlined"
          onChange={({ target: { value } }) => handleChange('remindTime', value)}
          value={event['remindTime']}
        >
          {remindsInterval.map((interval) => (
            <option key={interval} value={interval}>
              {interval} минут
            </option>
          ))}
        </ShortSelect>

        <ButtonGroup>
          <Button onClick={closeModal} variant="contained">
            отменить
          </Button>
          <Button onClick={submit} color="primary" variant="contained">
            сохранить
          </Button>
        </ButtonGroup>
      </StyledPaper>
    </StyledModal>
  )
}
