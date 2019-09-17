import React, { Component } from 'react'

import EventView from './EventView.js'

export default class EventListView extends Component {
  render () {
    return this.props.logs.map((log) => {
      return (
        <EventView key={log.id} type={log.type} params={log.params} updatedAt={log.updatedAt} teams={this.props.teams} services={this.props.services} />
      )
    })
  }
}
