export default class NotificationModel {
  constructor (props) {
    this.id = props.id
    this.title = props.title
    this.description = props.description
    this.teamId = props.team_id
    this.createdAt = new Date(props.created_at)
    this.updatedAt = new Date(props.updated_at)
  }
}
