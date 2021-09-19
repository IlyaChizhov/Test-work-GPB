import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { deleteNotification, Notification } from '../../ducks/notifications'

export default function useNotification(notification: Notification) {
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(deleteNotification(notification.id))
    }, notification.hideTimeout)
  }, [dispatch, notification])

  const handleDelete = () => {
    dispatch(deleteNotification(notification.id))
  }

  return { handleDelete }
}
