import alt from '../util/alt.js'
import CompetitionRoundModel from '../model/CompetitionRoundModel.js'

class CompetitionRoundActions {
  static fetchPromise () {
    return new Promise((resolve, reject) => {
      fetch('/api/competition/round')
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
          resolve(new CompetitionRoundModel(data))
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  update (competitionRound) {
    return competitionRound
  }

  fetch () {
    return (dispatch) => {
      dispatch()

      CompetitionRoundActions
        .fetchPromise()
        .then((competitionRound) => {
          this.update(competitionRound)
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

export default alt.createActions(CompetitionRoundActions)
