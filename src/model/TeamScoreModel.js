export default class TeamScoreModel {
  constructor (props) {
    this.id = props.id
    this.teamId = props.team_id
    this.roundId = props.round_id
    this.attackPoints = props.attack_points
    this.availabilityPoints = props.availability_points
    this.defencePoints = props.defence_points
  }
}
