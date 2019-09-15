import 'typeface-roboto'
import React from 'react'
import ReactDOM from 'react-dom'
import AppWrapper from './AppWrapper.js'
import dataManager from './util/dataManager.js'

function ready (callback) {
  return new Promise((resolve, reject) => {
    if (document.readyState !== 'loading') {
      resolve()
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        resolve()
      })
    }
  })
}

function loadPolyfills () {
  return new Promise((resolve, reject) => {
    if (typeof window.IntersectionObserver === 'undefined') {
      import('intersection-observer')
        .then(function () {
          resolve()
        })
    } else {
      resolve()
    }
  })
}

ready()
  .then(function () {
    return loadPolyfills()
  })
  .then(function () {
    return dataManager.getIdentity()
  }).then(function (identity) {
    ReactDOM.render(<AppWrapper identity={identity} />, document.getElementById('root'))
  })
  .catch(function (err) {
    console.log('Error', err)
  })
