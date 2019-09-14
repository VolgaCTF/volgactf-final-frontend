import { List } from 'immutable'

import alt from '../util/alt.js'
import eventManager from '../util/eventManager.js'

import NotificationStatusActions from '../actions/NotificationStatusActions.js'
import NotificationModel from '../model/NotificationModel.js'

class NotificationStatusStore {
  constructor () {
    this.state = {
      loading: false,
      err: null,
      total: 0,
      read: new List()
    }

    this.bindListeners({
      handleUpdate: NotificationStatusActions.UPDATE,
      handleFetch: NotificationStatusActions.FETCH,
      handleFailed: NotificationStatusActions.FAILED,
      handleMarkAsRead: NotificationStatusActions.MARK_AS_READ,
      handleOnMarkAsRead: NotificationStatusActions.ON_MARK_AS_READ,
      handleOnAdd: NotificationStatusActions.ON_ADD,
      handleOnAlter: NotificationStatusActions.ON_ALTER,
      handleOnRemove: NotificationStatusActions.ON_REMOVE
    })

    eventManager.on('notification/add', function (e) {
      const notificationId = JSON.parse(e.data).id
      NotificationStatusActions.onAdd(notificationId)
    })

    eventManager.on('notification/remove', function (e) {
      const notificationId = JSON.parse(e.data).id
      NotificationStatusActions.onRemove(notificationId)
    })

    eventManager.on('notification/alter', function (e) {
      const notificationId = JSON.parse(e.data).id
      NotificationStatusActions.onAlter(notificationId)
    })
  }

  handleUpdate (data) {
    this.setState({
      loading: false,
      err: null,
      total: data.total,
      read: data.read
    })
  }

  handleFetch () {
    this.setState({
      loading: true,
      err: null,
      total: 0,
      read: new List()
    })
  }

  handleFailed (err) {
    this.setState({
      loading: false,
      err: err,
      total: 0,
      read: new List()
    })
  }

  handleMarkAsRead () {
    this.setState({
      loading: false,
      err: null,
      total: this.state.total,
      read: this.state.read
    })
  }

  handleOnMarkAsRead (notificationId) {
    this.setState({
      loading: false,
      err: null,
      total: this.state.total,
      read: this.state.read.push(notificationId)
    })
  }

  handleOnAdd (notificationId) {
    this.setState({
      loading: false,
      err: null,
      total: this.state.total +1,
      read: this.state.read
    })
  }

  handleOnAlter (notificationId) {
    this.setState({
      loading: false,
      err: null,
      total: this.state.total,
      read: this.state.read.filter(x => x !== notificationId)
    })
  }

  handleOnRemove (notificationId) {
    this.setState({
      loading: false,
      err: null,
      total: this.state.total - 1,
      read: this.state.read.filter(x => x !== notificationId)
    })
  }
}

export default alt.createStore(NotificationStatusStore, 'NotificationStatusStore')
