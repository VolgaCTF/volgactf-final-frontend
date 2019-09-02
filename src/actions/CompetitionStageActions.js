import alt from '../util/alt.js'
import CompetitionStageModel from '../model/CompetitionStageModel.js'

class CompetitionStageActions {
  static fetchPromise () {
    return new Promise((resolve, reject) => {
      fetch('/api/competition/stage')
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
          resolve(new CompetitionStageModel(data))
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  update (competitionStage) {
    return competitionStage
  }

  fetch () {
    return (dispatch) => {
      dispatch()

      CompetitionStageActions
      .fetchPromise()
      .then((competitionStage) => {
        this.update(competitionStage)
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

export default alt.createActions(CompetitionStageActions)
