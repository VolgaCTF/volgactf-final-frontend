import alt from '../util/alt.js'

import { List } from 'immutable'

class NotificationStatusActions {
  update (data) {
    return data
  }

  failed (err) {
    return err
  }

  fetch () {
    return (dispatch) => {
      dispatch()

      fetch('/api/notification/status')
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json()
          } else {
            const err = new Error(response.statusText)
            err.response = response
            throw err
          }
        })
        .then((data) => {
          this.update({
            total: data.total,
            read: new List(data.read)
          })
        })
        .catch((err) => {
          this.failed(err)
        })
    }
  }

  markAsRead (id) {
    return (dispatch) => {
      dispatch()

      fetch(`/api/notification/${id}/read`, {
        method: 'POST'
      })
        .then((response) => {
          if (response.status === 200) {
            this.onMarkAsRead(id)
          } else {
            this.failed(new Error('Unexpected status code'))
          }
        })
        .catch((err) => {
          this.failed(err)
        })
    }
  }

  onMarkAsRead (notificationId) {
    return notificationId
  }

  onAdd (notificationId) {
    return notificationId
  }

  onAlter (notificationId) {
    return notificationId
  }

  onRemove (notificationId) {
    return notificationId
  }
}

export default alt.createActions(NotificationStatusActions)
