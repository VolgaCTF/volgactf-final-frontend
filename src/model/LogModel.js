export default class LogModel {
  constructor (props) {
    this.id = props.id
    this.type = props.type
    this.params = props.params
    this.updatedAt = new Date()
  }
}
