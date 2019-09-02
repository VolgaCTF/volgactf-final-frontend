export default class TeamServicePushStateModel {
  constructor (props) {
    this.id = props.id
    this.teamId = props.team_id
    this.serviceId = props.service_id
    this.state = props.state
    this.message = props.message
    this.updatedAt = new Date(props.updated_at)
  }
}
