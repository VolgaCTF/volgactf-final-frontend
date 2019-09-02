import alt from '../util/alt.js'
import TeamServicePushStateActions from '../actions/TeamServicePushStateActions.js'
import { List } from 'immutable'
import eventManager from '../util/eventManager.js'
import TeamServicePushStateModel from '../model/TeamServicePushStateModel.js'

class TeamServicePushStateStore {
  constructor () {
    this.state = {
      loading: true,
      err: null,
      collection: new List()
    }

    this.bindListeners({
      handleUpdate: TeamServicePushStateActions.UPDATE,
      handleFetch: TeamServicePushStateActions.FETCH,
      handleFailed: TeamServicePushStateActions.FAILED,
      handleUpdateSingle: TeamServicePushStateActions.UPDATE_SINGLE
    })

    eventManager.on('team/service/push-state', (e) => {
      let data = JSON.parse(e.data)
      TeamServicePushStateActions.updateSingle(new TeamServicePushStateModel(data))
    })
  }

  handleUpdate (teamServicePushStates) {
    this.setState({
      loading: false,
      err: null,
      collection: teamServicePushStates
    })
  }

  handleUpdateSingle (teamServicePushState) {
    let ndx = this.state.collection.findIndex(x => (x.teamId === teamServicePushState.teamId && x.serviceId === teamServicePushState.serviceId))
    this.setState({
      loading: false,
      err: null,
      collection: (ndx === -1) ? this.state.collection.push(teamServicePushState) : this.state.collection.set(ndx, teamServicePushState)
    })
  }

  handleFetch () {
    this.setState({
      loading: true,
      err: null,
      collection: new List()
    })
  }

  handleFailed (err) {
    this.setState({
      loading: false,
      err: err,
      collection: new List()
    })
  }
}

export default alt.createStore(TeamServicePushStateStore, 'TeamServicePushStateStore')
