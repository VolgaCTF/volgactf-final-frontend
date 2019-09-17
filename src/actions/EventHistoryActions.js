import { List } from 'immutable'

import alt from '../util/alt.js'
import EventModel from '../model/EventModel.js'

class EventHistoryActions {
  update (data) {
    return data
  }

  fetch (timestamp, page, pageSize) {
    return (dispatch) => {
      dispatch()

      const url = new URL('/api/event/history', `${window.location.protocol}//${window.location.hostname}`)
      const params = {
        timestamp: timestamp,
        page: page,
        page_size: pageSize
      }
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      fetch(url)
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
            timestamp: data.timestamp,
            page: data.page,
            pageSize: data.page_size,
            total: data.total,
            entries: new List(data.entries.map((props) => new EventModel(props)))
          })
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

export default alt.createActions(EventHistoryActions)
