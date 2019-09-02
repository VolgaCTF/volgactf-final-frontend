import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/styles'
import { Typography, Paper, Link } from '@material-ui/core'

import { Warning } from '@material-ui/icons'

import { red } from '@material-ui/core/colors'

import UploadTeamLogoDialogView from './UploadTeamLogoDialogView.js'

const styles = theme => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: red['50'],
    borderColor: red['50'],
    color: red['600']
  },
  warningIcon: {
    display: 'inline-block',
    verticalAlign: 'text-bottom',
    marginRight: theme.spacing(1)
  }
})

class TeamLogoAlertView extends Component {
  constructor (props) {
    super(props)

    this.onUploadTeamLogoDialog = this.onUploadTeamLogoDialog.bind(this)
  }

  onUploadTeamLogoDialog () {
    this.refs.uploadTeamLogoDialog.start()
  }

  render () {
    const buttonStyle = {
      fontWeight: 'bold',
      fontSize: '100%',
      textTransform: 'none',
      color: red['600'],
      textDecoration: 'underline'
    }
    return (
      <Paper elevation={0} square={true} className={this.props.classes.root}>
        <Warning className={this.props.classes.warningIcon}/>
        <Typography variant="body1" component="span">
          Your team does not have a logo.&nbsp;
        </Typography>
        <Link component="button" variant="body1" color="inherit" underline="always" onClick={this.onUploadTeamLogoDialog}>Upload</Link>
        <UploadTeamLogoDialogView ref='uploadTeamLogoDialog'/>
      </Paper>
    )
  }
}

TeamLogoAlertView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TeamLogoAlertView)
