import React, { Component} from 'react'
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
    this.navigate = this.navigate.bind(this)
  }

  navigate (e) {
    e.preventDefault()
    this.props.history.push(e.target.getAttribute('href'))
  }

  render () {
    let links = [
      <li key={0}><Link href='/' onClick={this.navigate}>Home</Link></li>,
      <li key={1}><Link href='/scoreboard' onClick={this.navigate}>Scoreboard</Link></li>,
      <li key={2}><Link href='/news' onClick={this.navigate}>News</Link></li>
    ]

    if (this.props.identity.isInternal()) {
      links.push(<li key={3}><Link href='/logs' onClick={this.navigate}>Logs</Link></li>)
    }

    return (
      <DocumentTitle title={`${this.props.customContent.competitionTitle} :: Not Found`}>
        <Paper elevation={0} square={true} className={this.props.classes.root}>
          <Typography variant="h4" component="h1">Not Found</Typography>
          <Typography variant="body1" component="div">
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
