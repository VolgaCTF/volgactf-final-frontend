import { List } from 'immutable'

import alt from '../util/alt.js'
import eventManager from '../util/eventManager.js'
import NotificationActions from '../actions/NotificationActions.js'
import NotificationModel from '../model/NotificationModel.js'

class NotificationStore {
  constructor () {
    this.state = {
      loading: true,
      err: null,
      collection: new List()
    }

    this.bindListeners({
      handleUpdate: NotificationActions.UPDATE,
      handleFetch: NotificationActions.FETCH,
      handleFailed: NotificationActions.FAILED,
      handleOnAdd: NotificationActions.ON_ADD,
      handleOnAlter: NotificationActions.ON_ALTER,
      handleOnRemove: NotificationActions.ON_REMOVE,
      handleRemove: NotificationActions.REMOVE,
      handleAdd: NotificationActions.ADD,
      handleAlter: NotificationActions.ALTER
    })

    eventManager.on('notification/add', function (e) {
      NotificationActions.onAdd(new NotificationModel(JSON.parse(e.data)))
    })

    eventManager.on('notification/remove', function (e) {
      NotificationActions.onRemove(JSON.parse(e.data).id)
    })

    eventManager.on('notification/alter', function (e) {
      NotificationActions.onAlter(new NotificationModel(JSON.parse(e.data)))
    })
  }

  handleUpdate (notifications) {
    this.setState({
      loading: false,
      err: null,
      collection: notifications
    })
  }

  handleOnAdd (notification) {
    this.setState({
      loading: false,
      err: null,
      collection: this.state.collection.push(notification)
    })
  }

  handleOnAlter (notification) {
    const ndx = this.state.collection.findIndex(x => x.id === notification.id)
    this.setState({
      loading: false,
      err: null,
      collection: (ndx === -1) ? this.state.collection.push(notification) : this.state.collection.set(ndx, notification)
    })
  }

  handleOnRemove (notificationId) {
    this.setState({
      loading: false,
      err: null,
      collection: this.state.collection.filter(x => x.id !== notificationId)
    })
  }

  handleRemove () {
    this.setState({
      loading: false,
      err: null,
      collection: this.state.collection
    })
  }

  handleAdd () {
    this.setState({
      loading: false,
      err: null,
      collection: this.state.collection
    })
  }

  handleAlter () {
    this.setState({
      loading: false,
      err: null,
      collection: this.state.collection
    })
  }

  handleFetch () {
    this.setState({
      loading: true,
      err: null,
      collection: new List()
    })
  }

  handleFailed (err) {
    this.setState({
      loading: false,
      err: err,
      collection: new List()
    })
  }
}

export default alt.createStore(NotificationStore, 'NotificationStore')
