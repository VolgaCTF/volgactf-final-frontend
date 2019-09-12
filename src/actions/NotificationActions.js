import { List } from 'immutable'

import alt from '../util/alt.js'
import NotificationModel from '../model/NotificationModel.js'

class NotificationActions {
  static fetchPromise () {
    return new Promise((resolve, reject) => {
      fetch('/api/notifications')
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
          resolve(new List(data.map((props) => new NotificationModel(props))))
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  static addPromise (title, description, teamId) {
    return new Promise((resolve, reject) => {
      fetch('/api/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          description: description,
          team_id: teamId
        })
      })
        .then((response) => {
          if (response.status === 201) {
            resolve()
          } else {
            reject(new Error('Unexpected status code'))
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  static alterPromise (id, title, description) {
    return new Promise((resolve, reject) => {
      fetch(`/api/notification/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          description: description
        })
      })
        .then((response) => {
          if (response.status === 204) {
            resolve()
          } else {
            reject(new Error('Unexpected status code'))
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  static removePromise (id) {
    return new Promise((resolve, reject) => {
      fetch(`/api/notification/${id}`, {
        method: 'delete'
      })
        .then((response) => {
          if (response.status === 204) {
            resolve()
          } else {
            reject(new Error('Unexpected status code'))
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  update (notifications) {
    return notifications
  }

  onAdd (notification) {
    return notification
  }

  onAlter (notification) {
    return notification
  }

  onRemove (notificationId) {
    return notificationId
  }

  fetch () {
    return (dispatch) => {
      dispatch()

      NotificationActions
        .fetchPromise()
        .then((notifications) => {
          this.update(notifications)
        })
        .catch((err) => {
          this.failed(err)
        })
    }
  }

  add (title, description, teamId) {
    return (dispatch) => {
      dispatch()

      NotificationActions
        .addPromise(title, description, teamId)
        .then(() => {
        })
        .catch((err) => {
          this.failed(err)
        })
    }
  }

  alter (id, title, description) {
    return (dispatch) => {
      dispatch()

      NotificationActions
        .alterPromise(id, title, description)
        .then(() => {
        })
        .catch((err) => {
          this.failed(err)
        })
    }
  }

  remove (id) {
    return (dispatch) => {
      dispatch()

      NotificationActions
        .removePromise(id)
        .then(() => {
        })
        .catch((err) => {
          this.failed(err)
        })
    }
  }

  failed (err) {
    return err
  }
}

export default alt.createActions(NotificationActions)
