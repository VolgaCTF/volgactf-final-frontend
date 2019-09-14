import React, { Component } from 'react'

import NotificationView from './NotificationView.js'

export default class NotificationListView extends Component {
  render () {
    return (
      <>
        {
          (() => {
            return this.props.notifications.map((notification) => {
              const read = this.props.readItems.includes(notification.id)
              return (
                <NotificationView
                  key={notification.id}
                  id={notification.id}
                  title={notification.title}
                  description={notification.description}
                  teamId={notification.teamId}
                  updatedAt={notification.updatedAt}
                  read={read}
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
