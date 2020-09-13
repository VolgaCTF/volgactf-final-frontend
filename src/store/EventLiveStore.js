import { List } from 'immutable'

import alt from '../util/alt.js'
import EventLiveActions from '../actions/EventLiveActions.js'
import eventManager from '../util/eventManager.js'
import EventModel from '../model/EventModel.js'

class EventLiveStore {
  constructor () {
    this.cache = []

    this.state = {
      loading: false,
      err: null,
      collection: new List()
    }

    this.bindListeners({
      handlePush: EventLiveActions.PUSH
    })

    eventManager.on('log', (e) => {
      const data = JSON.parse(e.data)
      data.id = parseInt(e.lastEventId, 10)
      this.cache.push(new EventModel(data))
    })

    eventManager.on('team/service/push-state', (e) => {
      this.cache.push(new EventModel({
        id: parseInt(e.lastEventId, 10),
        type: 31,
        params: JSON.parse(e.data)
      }))
    })

    eventManager.on('team/service/pull-state', (e) => {
      this.cache.push(new EventModel({
        id: parseInt(e.lastEventId, 10),
        type: 32,
        params: JSON.parse(e.data)
      }))
    })

    this.recordLimit = 250
    this.onRefresh = this.onRefresh.bind(this)
    this.refreshInterval = setInterval(this.onRefresh, 2000)
  }

  onRefresh () {
    EventLiveActions.push(this.cache)
    this.cache = []
  }

  handlePush (entries) {
    if (this.state.collection.size + entries.length > this.recordLimit) {
      this.state.collection = this.state.collection.slice(-this.recordLimit)
    }

    this.setState({
      loading: false,
      err: null,
      collection: List.prototype.push.apply(this.state.collection, entries).groupBy(x => x.id).map(x => x.first()).toList()
    })
  }
}

export default alt.createStore(EventLiveStore, 'EventLiveStore')
