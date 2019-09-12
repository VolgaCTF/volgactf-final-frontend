import React, { Component } from 'react'

import NotificationView from './NotificationView.js'

export default class NotificationListView extends Component {
  render () {
    return (
      <>
        {
          (() => {
            return this.props.notifications.map((notification) => {
              return (
                <NotificationView
                  key={notification.id}
                  id={notification.id}
                  title={notification.title}
                  description={notification.description}
                  teamId={notification.teamId}
                  updatedAt={notification.updatedAt}
                  teams={this.props.teams}
                  identity={this.props.identity}
                />
              )
            })
          })()
        }
      </>
    )
  }
}
