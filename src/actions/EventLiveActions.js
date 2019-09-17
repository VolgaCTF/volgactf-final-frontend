import alt from '../util/alt.js'

class EventLiveActions {
  push (entries) {
    return (dispatch) => {
      dispatch(entries)
    }
  }
}

export default alt.createActions(EventLiveActions)
