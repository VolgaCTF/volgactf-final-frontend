import alt from '../util/alt.js'
import ScoreboardModel from '../model/ScoreboardModel.js'

class ScoreboardActions {
  static fetchPromise () {
    return new Promise((resolve, reject) => {
      fetch('/api/scoreboard')
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        } else {
          let err = new Error(response.statusText)
          err.response = response
          throw err
        }
      })
      .then((data) => {
        resolve(new ScoreboardModel(data))
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  update (scoreboard) {
    return scoreboard
  }

  fetch () {
    return (dispatch) => {
      dispatch()

      ScoreboardActions
      .fetchPromise()
      .then((scoreboard) => {
        this.update(scoreboard)
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

export default alt.createActions(ScoreboardActions)
