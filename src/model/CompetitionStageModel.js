export default class CompetitionStageModel {
  constructor (props) {
    this.value = props.value
  }

  isNotStarted () {
    return this.value === 0
  }

  isStarting () {
    return this.value === 1
  }

  isStarted () {
    return this.value === 2
  }

  isPausing () {
    return this.value === 3
  }

  isPaused () {
    return this.value === 4
  }

  isFinishing () {
    return this.value === 5
  }

  isFinished () {
    return this.value === 6
  }
}
