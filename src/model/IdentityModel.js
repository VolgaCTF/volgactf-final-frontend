export default class IdentityModel {
  constructor (props) {
    this.id = props.id
    this.name = props.name
  }

  isTeam () {
    return this.name === 'team'
  }

  getId () {
    return this.id
  }

  isInternal () {
    return this.name === 'internal'
  }

  isExternal () {
    return this.name === 'external'
  }
}
