import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

import { withStyles } from '@material-ui/styles'
import { Button, Card, CardActions, CardActionArea, CardContent, Typography } from '@material-ui/core'

import PostRemoveDialogView from './PostRemoveDialogView.js'
import PostEditDialogView from './PostEditDialogView.js'

import MarkdownRenderer from '../util/MarkdownRenderer.js'

const styles = theme => ({
  root: {
    marginTop: theme.spacing(2)
  }
})

class PostView extends React.Component {
  constructor (props) {
    super(props)
    this.md = new MarkdownRenderer()
    this.onEditPost = this.onEditPost.bind(this)
    this.onRemovePost = this.onRemovePost.bind(this)
  }

  onEditPost () {
    this.refs.editDialog.start()
  }

  onRemovePost () {
    this.refs.removeDialog.start()
  }

  render () {
    return (
      <Card className={this.props.classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {this.props.title}
          </Typography>
          <Typography variant="body1" dangerouslySetInnerHTML={{__html: this.md.render(this.props.description)}}>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Published on {moment(this.props.updatedAt).format('lll')}
          </Typography>
        </CardContent>
        {
          (() => {
            if (this.props.identity.isInternal()) {
              return (
                <CardActions>
                  <Button size="small" onClick={this.onEditPost}>Edit</Button>
                  <Button size="small" onClick={this.onRemovePost}>Remove</Button>
                </CardActions>
              )
            } else {
              return ''
            }
          })()
        }
        <PostEditDialogView ref='editDialog' id={this.props.id} title={this.props.title} description={this.props.description} />
        <PostRemoveDialogView ref='removeDialog' id={this.props.id} title={this.props.title} />
      </Card>
    )
  }
}

PostView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PostView)
