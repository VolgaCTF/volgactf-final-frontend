import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import { deepOrange, yellow, green, red, grey } from '@material-ui/core/colors'

import eventManager from '../util/eventManager.js'

const styles = theme => ({
  root: {
    display: 'inline-block',
    padding: theme.spacing(0.5, 1),
    marginRight: theme.spacing(1),
    cursor: 'default'
  },
  notSupported: {
    color: deepOrange['500'],
    backgroundColor: deepOrange['50']
  },
  connecting: {
    color: yellow['800'],
    backgroundColor: yellow['50']
  },
  connected: {
    color: green['700'],
    backgroundColor: green['50']
  },
  closed: {
    color: red['600'],
    backgroundColor: red['50']
  },
  notAvailable: {
    color: grey['600'],
    backgroundColor: grey['100']
  }
})

class StreamStatusView extends Component {
  constructor (props) {
    super(props)
    this.interval = null
    this.state = {
      readyState: null
    }

    this.update = () => {
      this.setState({
        readyState: eventManager.readyState
      })
    }
  }

  componentDidMount () {
    this.interval = window.setInterval(this.update, 1000)
    this.update()
  }

  componentWillUnmount () {
    if (this.interval) {
      window.clearInterval(this.interval)
      this.interval = null
    }
  }

  render () {
    let text = null
    const classes = [this.props.classes.root]

    switch (this.state.readyState) {
      case -1:
        text = 'not supported'
        classes.push(this.props.classes.notSupported)
        break
      case 0:
        text = 'connecting'
        classes.push(this.props.classes.connecting)
        break
      case 1:
        text = 'connected'
        classes.push(this.props.classes.connected)
        break
      case 2:
        text = 'closed'
        classes.push(this.props.classes.closed)
        break
      default:
        text = 'n/a'
        classes.push(this.props.classes.notAvailable)
        break
    }
    return <Typography variant="body2" component="span" className={classes.join(' ')}>{`Stream: ${text}`}</Typography>
  }
}

StreamStatusView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StreamStatusView)
