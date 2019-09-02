import React, { Component } from 'react'

import PostView from './PostView.js'

export default class PostListView extends Component {
  render () {
    const postViewNodes = this.props.posts.map((post) => {
      return (
        <PostView key={post.id} id={post.id} title={post.title} description={post.description} updatedAt={post.updatedAt} identity={this.props.identity} />
      )
    })
    return (
      <div>
        {postViewNodes}
      </div>
    )
  }
}
