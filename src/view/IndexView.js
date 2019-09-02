import React, { Component} from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import { withStyles } from '@material-ui/styles'
import { Typography, Paper } from '@material-ui/core'

import MarkdownRenderer from '../util/MarkdownRenderer.js'

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }
})

class IndexView extends Component {
  constructor (props) {
    super(props)
    this.md = new MarkdownRenderer({
      html: true
    })
  }

  render () {
    return (
      <DocumentTitle title={this.props.customContent.competitionTitle}>
        <Paper elevation={0} square={true} className={this.props.classes.root}>
          <Typography variant="h4" component="h1">{this.props.customContent.indexTitle}</Typography>
          <Typography variant="body1" dangerouslySetInnerHTML={{__html: this.md.render(this.props.customContent.indexDescription)}}>
          </Typography>
        </Paper>
      </DocumentTitle>
    )
  }
}

IndexView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(IndexView)
