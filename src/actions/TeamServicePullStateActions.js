import alt from '../util/alt.js'
import TeamServicePullStateModel from '../model/TeamServicePullStateModel.js'
import { List } from 'immutable'

class TeamServicePullStateActions {
  static fetchPromise () {
    return new Promise((resolve, reject) => {
      fetch('/api/team/service/pull-states')
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
          const teamServicePullStates = data.map((props) => {
            return new TeamServicePullStateModel(props)
          })
          resolve(new List(teamServicePullStates))
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  update (teamServicePullStates) {
    return teamServicePullStates
  }

  updateSingle (teamServicePullState) {
    return teamServicePullState
  }

  fetch () {
    return (dispatch) => {
      dispatch()

      TeamServicePullStateActions
        .fetchPromise()
        .then((teamServicePullStates) => {
          this.update(teamServicePullStates)
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

export default alt.createActions(TeamServicePullStateActions)
