import ScoreboardPositionModel from './ScoreboardPositionModel.js'

export default class ScoreboardModel {
  constructor (props) {
    this.muted = props.muted
    this.positions = props.positions.map((positionProps) => {
      return new ScoreboardPositionModel(positionProps)
    })
  }
}
