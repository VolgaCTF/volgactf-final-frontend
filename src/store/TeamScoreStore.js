import alt from '../util/alt.js'
import TeamScoreActions from '../actions/TeamScoreActions.js'
import { List } from 'immutable'
import eventManager from '../util/eventManager.js'
import TeamScoreModel from '../model/TeamScoreModel.js'

class TeamScoreStore {
  constructor (teamId) {
    this.state = {
      loading: true,
      err: null,
      filter: teamId,
      collection: new List()
    }

    this.bindListeners({
      handleUpdate: TeamScoreActions.UPDATE,
      handleFetch: TeamScoreActions.FETCH,
      handleFailed: TeamScoreActions.FAILED,
      handleOnAdd: TeamScoreActions.ON_ADD
    })

    eventManager.on('team/score', (e) => {
      const data = JSON.parse(e.data)
      TeamScoreActions.onAdd(new TeamScoreModel(data))
    })
  }

  handleUpdate (teamScores) {
    this.setState({
      loading: false,
      err: null,
      filter: this.state.filter,
      collection: teamScores
    })
  }

  handleOnAdd (teamScore) {
    if (teamScore.teamId !== this.state.filter) {
      return
    }

    this.setState({
      loading: false,
      err: null,
      filter: this.state.filter,
      collection: this.state.collection.push(teamScore)
    })
  }

  handleFetch () {
    this.setState({
      loading: true,
      err: null,
      filter: this.state.filter,
      collection: new List()
    })
  }

  handleFailed (err) {
    this.setState({
      loading: false,
      err: err,
      filter: this.state.filter,
      collection: new List()
    })
  }
}

const storeCache = {}

export function createTeamScoreStore (teamId) {
  if (!Object.prototype.hasOwnProperty.call(storeCache, teamId)) {
    storeCache[teamId] = alt.createStore(TeamScoreStore, `TeamScoreStore#${teamId}`, teamId)
  }
  return storeCache[teamId]
}
