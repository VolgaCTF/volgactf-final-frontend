import 'typeface-roboto'
import React from 'react'
import ReactDOM from 'react-dom'
import AppWrapper from './AppWrapper.js'
import dataManager from './util/dataManager.js'

function ready (callback) {
  if (document.readyState !== 'loading') {
    callback()
  } else {
    document.addEventListener('DOMContentLoaded', callback)
  }
}

ready(function () {
  dataManager
    .getIdentity()
    .then(function (identity) {
      ReactDOM.render(<AppWrapper identity={identity} />, document.getElementById('root'))
    })
    .catch(function (err) {
      console.log('Error', err)
    })
})
