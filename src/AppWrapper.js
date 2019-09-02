import React, { Component, Fragment} from 'react'
import {hot} from 'react-hot-loader'
import DocumentTitle from 'react-document-title'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App.js'
import './App.css'

import customTheme from 'Branding/theme.js'
import customContent from 'Branding/content.js'

class AppWrapper extends Component {
  render () {
    return (
      <DocumentTitle title={customContent.competitionTitle}>
        <Fragment>
          <CssBaseline />
          <Router>
            <ThemeProvider theme={customTheme}>
              <App identity={this.props.identity} customContent={customContent} />
            </ThemeProvider>
          </Router>
        </Fragment>
      </DocumentTitle>
    )
  }
}

export default hot(module)(AppWrapper)
