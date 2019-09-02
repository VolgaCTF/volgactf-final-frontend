import { List } from 'immutable'

import alt from '../util/alt.js'
import PostModel from '../model/PostModel.js'

class PostActions {
  static fetchPromise () {
    return new Promise((resolve, reject) => {
      fetch('/api/posts')
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        } else {
          let err = new Error(response.statusText)
          err.response = response
          throw err
        }
      })
      .then((data) => {
        let posts = data.map((props) => {
          return new PostModel(props)
        })
        resolve(new List(posts))
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  static addPromise (postTitle, postDescription) {
    return new Promise((resolve, reject) => {
      fetch('/api/post', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: postTitle,
          description: postDescription
        })
      })
      .then((response) => {
        if (response.status === 201) {
          resolve()
        } else {
          reject('Unexpected status code')
        }
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  static editPromise (postId, postTitle, postDescription) {
    return new Promise((resolve, reject) => {
      fetch(`/api/post/${postId}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: postTitle,
          description: postDescription
        })
      })
      .then((response) => {
        if (response.status === 204) {
          resolve()
        } else {
          reject('Unexpected status code')
        }
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  static removePromise (postId) {
    return new Promise((resolve, reject) => {
      fetch(`/api/post/${postId}`, {
        method: 'delete'
      })
      .then((response) => {
        if (response.status === 204) {
          resolve()
        } else {
          reject('Unexpected status code')
        }
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  update (posts) {
    return posts
  }

  onAdd (post) {
    return post
  }

  onEdit (post) {
    return post
  }

  onRemove (postId) {
    return postId
  }

  fetch () {
    return (dispatch) => {
      dispatch()

      PostActions
      .fetchPromise()
      .then((posts) => {
        this.update(posts)
      })
      .catch((err) => {
        this.failed(err)
      })
    }
  }

  add (postTitle, postDescription) {
    return (dispatch) => {
      dispatch()

      PostActions
      .addPromise(postTitle, postDescription)
      .then(() => {
      })
      .catch((err) => {
        this.failed(err)
      })
    }
  }

  edit (postId, postTitle, postDescription) {
    return (dispatch) => {
      dispatch()

      PostActions
      .editPromise(postId, postTitle, postDescription)
      .then(() => {
      })
      .catch((err) => {
        this.failed(err)
      })
    }
  }

  remove (postId) {
    return (dispatch) => {
      dispatch()

      PostActions
      .removePromise(postId)
      .then(() => {
      })
      .catch((err) => {
        this.failed(err)
      })
    }
  }

  failed (err) {
    return err
  }
}

export default alt.createActions(PostActions)
