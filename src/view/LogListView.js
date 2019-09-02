import React, { Component } from 'react'

import LogView from './LogView.js'

export default class LogListView extends Component {
  render () {
    const logViewNodes = this.props.logs.map((log) => {
      return (
        <LogView key={log.id} type={log.type} params={log.params} updatedAt={log.updatedAt} teams={this.props.teams} services={this.props.services} />
      )
    })
    return (
      <div>
        {logViewNodes}
      </div>
    )
  }
}
