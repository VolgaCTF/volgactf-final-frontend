import alt from '../util/alt.js'
import TeamModel from '../model/TeamModel.js'
import { List } from 'immutable'

class TeamActions {
  static fetchPromise () {
    return new Promise((resolve, reject) => {
      fetch('/api/teams')
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
          const teams = data.map((props) => {
            return new TeamModel(props)
          })
          resolve(new List(teams))
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  update (teams) {
    return teams
  }

  onModify (team) {
    return team
  }

  fetch () {
    return (dispatch) => {
      dispatch()

      TeamActions
        .fetchPromise()
        .then((teams) => {
          this.update(teams)
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

export default alt.createActions(TeamActions)
