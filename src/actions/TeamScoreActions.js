import alt from '../util/alt.js'
import TeamScoreModel from '../model/TeamScoreModel.js'
import { List } from 'immutable'

class TeamScoreActions {
  static fetchPromise (identity, teamId) {
    return new Promise((resolve, reject) => {
      const exactTeam = identity.isTeam() && (identity.getId() === teamId)
      fetch(exactTeam ? '/api/team/stats' : `/api/team/${teamId}/stats`)
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
          const teamScores = data.map((props) => {
            return new TeamScoreModel(props)
          })
          resolve(new List(teamScores))
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  update (teamScores) {
    return teamScores
  }

  onAdd (teamScore) {
    return teamScore
  }

  fetch (identity, teamId) {
    return (dispatch) => {
      dispatch()

      TeamScoreActions
        .fetchPromise(identity, teamId)
        .then((teamScores) => {
          this.update(teamScores)
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

export default alt.createActions(TeamScoreActions)
