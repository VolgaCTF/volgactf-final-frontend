import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import { withStyles } from '@material-ui/styles'
import { Typography, Button, Paper } from '@material-ui/core'

import PostListView from './PostListView.js'
import PostStore from '../store/PostStore.js'
import PostActions from '../actions/PostActions.js'
import PostAddDialogView from './PostAddDialogView.js'

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  topGutter: {
    marginTop: theme.spacing(2)
  }
})

class NewsView extends Component {
  constructor (props) {
    super(props)
    this.state = PostStore.getState()
    this.onUpdate = this.onUpdate.bind(this)
    this.onAddDialog = this.onAddDialog.bind(this)
  }

  componentDidMount () {
    PostStore.listen(this.onUpdate)
    PostActions.fetch()
  }

  componentWillUnmount () {
    PostStore.unlisten(this.onUpdate)
  }

  onUpdate (state) {
    this.setState(state)
  }

  onAddDialog () {
    this.refs.addDialog.start()
  }

  render () {
    return (
      <DocumentTitle title={`${this.props.customContent.competitionTitle} :: News}`}>
        <Paper elevation={0} square={true} className={this.props.classes.root}>
          <Typography variant="h4" component="h1">News</Typography>
          {
            (() => {
              if (this.props.identity.isInternal()) {
                return (
                  <div className={this.props.classes.topGutter}>
                    <Button variant="contained" color="primary" onClick={this.onAddDialog}>Add</Button>
                    <PostAddDialogView ref='addDialog' />
                  </div>
                )
              } else {
                return ''
              }
            })()
          }
          {
            (() => {
              if (this.state.loading) {
                return <Typography variant="body1" className={this.props.classes.topGutter}>Loading</Typography>
              }

              if (this.state.err) {
                return <Typography variant="body1" className={this.props.classes.topGutter}>Failed to fetch posts</Typography>
              }

              if (this.state.collection.isEmpty()) {
                return <Typography variant="body1" className={this.props.classes.topGutter}>No posts yet</Typography>
              } else {
                const sortedPosts = this.state.collection.sortBy(x => x.updatedAt.getTime()).reverse()
                return <PostListView posts={sortedPosts} identity={this.props.identity} />
              }
            })()
          }
        </Paper>
      </DocumentTitle>
    )
  }
}

NewsView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NewsView)
