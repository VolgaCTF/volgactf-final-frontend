import { List } from 'immutable'

import alt from '../util/alt.js'
import LogActions from '../actions/LogActions.js'
import eventManager from '../util/eventManager.js'
import LogModel from '../model/LogModel.js'

class LogStore {
  constructor () {
    this.cache = []

    this.state = {
      loading: false,
      err: null,
      collection: new List()
    }

    this.bindListeners({
      handlePush: LogActions.PUSH
    })

    eventManager.on('log', (e) => {
      let data = JSON.parse(e.data)
      data.id = parseInt(e.lastEventId, 10)
      this.cache.push(new LogModel(data))
    })

    this.recordLimit = 500
    this.onRefresh = this.onRefresh.bind(this)
    this.refreshInterval = setInterval(this.onRefresh, 2500)
  }

  onRefresh () {
    LogActions.push(this.cache)
    this.cache = []
  }

  handlePush (logs) {
    if (this.state.collection.size + logs.length > this.recordLimit) {
      this.state.collection = this.state.collection.slice(-this.recordLimit)
    }

    this.setState({
      loading: false,
      err: null,
      collection: List.prototype.push.apply(this.state.collection, logs).groupBy(x => x.id).map(x => x.first()).toList()
    })
  }
}

export default alt.createStore(LogStore, 'LogStore')
