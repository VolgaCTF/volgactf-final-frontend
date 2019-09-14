import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/styles'
import { Badge } from '@material-ui/core'

import NotificationStatusStore from '../store/NotificationStatusStore.js'
import NotificationStatusActions from '../actions/NotificationStatusActions.js'

const styles = theme => ({
  root: {
    paddingRight: theme.spacing(2)
  }
})

class NotificationTabListView extends Component {
  constructor (props) {
    super(props)
    this.onUpdate = this.onUpdate.bind(this)
    this.state = {
      notificationStatus: NotificationStatusStore.getState()
    }
  }

  onUpdate (notificationStatus) {
    this.setState({
      notificationStatus: notificationStatus
    })
  }

  componentDidMount () {
    NotificationStatusStore.listen(this.onUpdate)
    NotificationStatusActions.fetch()
  }

  componentWillUnmount () {
    NotificationStatusStore.unlisten(this.onUpdate)
  }

  render () {
    if (this.state.notificationStatus.loading) {
      return <Badge className={this.props.classes.root} color='secondary' badgeContent='…'>Notifications</Badge>
    } else if (this.state.notificationStatus.err) {
      console.log(this.state.notificationStatus.err)
      return <Badge className={this.props.classes.root} color='secondary' badgeContent='?'>Notifications</Badge>
    }

    const numNew = this.state.notificationStatus.total - this.state.notificationStatus.read.size
    if (numNew > 0) {
      return <Badge className={this.props.classes.root} color='secondary' badgeContent={numNew}>Notifications</Badge>
    }
    return 'Notifications'
  }
}

NotificationTabListView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NotificationTabListView)
