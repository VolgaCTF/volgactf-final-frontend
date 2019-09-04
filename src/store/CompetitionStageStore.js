import alt from '../util/alt.js'
import CompetitionStageActions from '../actions/CompetitionStageActions.js'
import eventManager from '../util/eventManager.js'
import CompetitionStageModel from '../model/CompetitionStageModel.js'

class CompetitionStageStore {
  constructor () {
    this.state = {
      loading: true,
      err: null,
      model: null
    }

    this.bindListeners({
      handleUpdate: CompetitionStageActions.UPDATE,
      handleFetch: CompetitionStageActions.FETCH,
      handleFailed: CompetitionStageActions.FAILED
    })

    eventManager.on('competition/stage', (e) => {
      const data = JSON.parse(e.data)
      CompetitionStageActions.update(new CompetitionStageModel(data))
    })
  }

  handleUpdate (competitionStage) {
    this.setState({
      loading: false,
      err: null,
      model: competitionStage
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

export default alt.createStore(CompetitionStageStore, 'CompetitionStageStore')
