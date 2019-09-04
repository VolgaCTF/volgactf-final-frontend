import alt from '../util/alt.js'
import TeamServicePushStateModel from '../model/TeamServicePushStateModel.js'
import { List } from 'immutable'

class TeamServicePushStateActions {
  static fetchPromise () {
    return new Promise((resolve, reject) => {
      fetch('/api/team/service/push-states')
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
          const teamServicePushStates = data.map((props) => {
            return new TeamServicePushStateModel(props)
          })
          resolve(new List(teamServicePushStates))
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  update (teamServicePushStates) {
    return teamServicePushStates
  }

  updateSingle (teamServicePushState) {
    return teamServicePushState
  }

  fetch () {
    return (dispatch) => {
      dispatch()

      TeamServicePushStateActions
        .fetchPromise()
        .then((teamServicePushStates) => {
          this.update(teamServicePushStates)
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

export default alt.createActions(TeamServicePushStateActions)
