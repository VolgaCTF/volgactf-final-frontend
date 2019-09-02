export default class ServiceModel {
  constructor (props) {
    this.id = props.id
    this.name = props.name
    this.attackPriority = props.attack_priority
    this.awardDefenceAfter = props.award_defence_after
    this.enableIn = props.enable_in
    this.disableIn = props.disable_in
  }
}
