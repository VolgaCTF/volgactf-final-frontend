export default class EventModel {
  constructor (props) {
    this.id = props.id
    this.type = props.type
    this.params = props.params
    this.updatedAt = Object.prototype.hasOwnProperty.call(props, 'created') ? new Date(props.created) : new Date()
  }
}
