export default class ScoreboardPositionModel {
  constructor (props) {
    this.teamId = props.team_id
    this.totalPoints = props.total_points
    this.attackPoints = props.attack_points
    this.availabilityPoints = props.availability_points
    this.defencePoints = props.defence_points
    this.lastAttack = props.last_attack ? new Date(props.last_attack) : null
    this.trend = props.trend
  }
}
