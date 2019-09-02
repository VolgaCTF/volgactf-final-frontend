import alt from '../util/alt.js'

class LogActions {
  push (logs) {
    return (dispatch) => {
      dispatch(logs)
    }
  }
}

export default alt.createActions(LogActions)
