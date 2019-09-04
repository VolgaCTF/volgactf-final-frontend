import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import { withStyles } from '@material-ui/styles'
import { Typography, Link, Paper } from '@material-ui/core'

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  list: {
    listStyleType: 'none',
    paddingLeft: theme.spacing(0)
  }
})

class NotFoundView extends Component {
  constructor (props) {
    super(props)
    this.handleNavigate = this.handleNavigate.bind(this)
  }

  handleNavigate (e) {
    e.preventDefault()
    this.props.history.push(e.target.getAttribute('href'))
  }

  render () {
    const links = [
      <li key={0}><Link href='/' onClick={this.handleNavigate}>Home</Link></li>,
      <li key={1}><Link href='/scoreboard' onClick={this.handleNavigate}>Scoreboard</Link></li>,
      <li key={2}><Link href='/news' onClick={this.handleNavigate}>News</Link></li>
    ]

    if (this.props.identity.isInternal()) {
      links.push(<li key={3}><Link href='/logs' onClick={this.handleNavigate}>Logs</Link></li>)
    }

    return (
      <DocumentTitle title={`${this.props.customContent.competitionTitle} :: Not Found`}>
        <Paper elevation={0} square className={this.props.classes.root}>
          <Typography variant='h4' component='h1'>Not Found</Typography>
          <Typography variant='body1' component='div'>
            <p>This is not the page you are looking for...</p>
            <p>Try these:</p>
            <ul className={this.props.classes.list}>
              {links}
            </ul>
          </Typography>
        </Paper>
      </DocumentTitle>
    )
  }
}

NotFoundView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NotFoundView)
