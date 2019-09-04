import alt from '../util/alt.js'
import ScoreboardActions from '../actions/ScoreboardActions.js'
import eventManager from '../util/eventManager.js'
import ScoreboardModel from '../model/ScoreboardModel.js'

class ScoreboardStore {
  constructor () {
    this.state = {
      loading: true,
      err: null,
      model: null
    }

    this.bindListeners({
      handleUpdate: ScoreboardActions.UPDATE,
      handleFetch: ScoreboardActions.FETCH,
      handleFailed: ScoreboardActions.FAILED
    })

    eventManager.on('scoreboard', (e) => {
      const data = JSON.parse(e.data)
      ScoreboardActions.update(new ScoreboardModel(data))
    })
  }

  handleUpdate (scoreboard) {
    this.setState({
      loading: false,
      err: null,
      model: scoreboard
    })
  }

  handleFetch () {
    this.setState({
      loading: true,
      err: null,
      model: null
    })
  }

  handleFailed (err) {
    this.setState({
      loading: false,
      err: err,
      model: null
    })
  }
}

export default alt.createStore(ScoreboardStore, 'ScoreboardStore')
