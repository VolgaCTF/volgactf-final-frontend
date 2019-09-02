import { List } from 'immutable'

import alt from '../util/alt.js'
import eventManager from '../util/eventManager.js'
import PostActions from '../actions/PostActions.js'
import PostModel from '../model/PostModel.js'

class PostStore {
  constructor () {
    this.state = {
      loading: true,
      err: null,
      collection: new List()
    }

    this.bindListeners({
      handleUpdate: PostActions.UPDATE,
      handleFetch: PostActions.FETCH,
      handleFailed: PostActions.FAILED,
      handleOnAdd: PostActions.ON_ADD,
      handleOnEdit: PostActions.ON_EDIT,
      handleOnRemove: PostActions.ON_REMOVE,
      handleRemove: PostActions.REMOVE,
      handleAdd: PostActions.ADD,
      handleEdit: PostActions.EDIT
    })

    eventManager.on('posts/add', function (e) {
      PostActions.onAdd(new PostModel(JSON.parse(e.data)))
    })

    eventManager.on('posts/remove', function (e) {
      PostActions.onRemove(JSON.parse(e.data).id)
    })

    eventManager.on('posts/edit', function (e) {
      PostActions.onEdit(new PostModel(JSON.parse(e.data)))
    })
  }

  handleUpdate (posts) {
    this.setState({
      loading: false,
      err: null,
      collection: posts
    })
  }

  handleOnAdd (post) {
    this.setState({
      loading: false,
      err: null,
      collection: this.state.collection.push(post)
    })
  }

  handleOnEdit (post) {
    let ndx = this.state.collection.findIndex(x => x.id === post.id)
    this.setState({
      loading: false,
      err: null,
      collection: (ndx === -1) ? this.state.collection.push(post) : this.state.collection.set(ndx, post)
    })
  }

  handleOnRemove (postId) {
    this.setState({
      loading: false,
      err: null,
      collection: this.state.collection.filter(x => x.id !== postId)
    })
  }

  handleRemove () {
    this.setState({
      loading: false,
      err: null,
      collection: this.state.collection
    })
  }

  handleAdd () {
    this.setState({
      loading: false,
      err: null,
      collection: this.state.collection
    })
  }

  handleEdit () {
    this.setState({
      loading: false,
      err: null,
      collection: this.state.collection
    })
  }

  handleFetch () {
    this.setState({
      loading: true,
      err: null,
      collection: new List()
    })
  }

  handleFailed (err) {
    this.setState({
      loading: false,
      err: err,
      collection: new List()
    })
  }
}

export default alt.createStore(PostStore, 'PostStore')
