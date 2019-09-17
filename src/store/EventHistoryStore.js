import { List } from 'immutable'

import alt from '../util/alt.js'

import EventHistoryActions from '../actions/EventHistoryActions.js'

class EventHistoryStore {
  constructor () {
    this.state = {
      loading: false,
      err: null,
      timestamp: null,
      page: null,
      pageSize: null,
      total: null,
      entries: new List()
    }

    this.bindListeners({
      handleUpdate: EventHistoryActions.UPDATE,
      handleFetch: EventHistoryActions.FETCH,
      handleFailed: EventHistoryActions.FAILED
    })
  }

  handleUpdate (data) {
    this.setState({
      loading: false,
      err: null,
      timestamp: data.timestamp,
      page: data.page,
      pageSize: data.pageSize,
      total: data.total,
      entries: data.entries
    })
  }

  handleFetch () {
    this.setState({
      loading: true,
      err: null,
      timestamp: null,
      page: null,
      pageSize: null,
      total: null,
      entries: new List()
    })
  }

  handleFailed (err) {
    this.setState({
      loading: false,
      err: err,
      timestamp: null,
      page: null,
      pageSize: null,
      total: null,
      entries: new List()
    })
  }
}

export default alt.createStore(EventHistoryStore, 'EventHistoryStore')
