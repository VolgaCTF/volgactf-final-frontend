import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'

import { withStyles } from '@material-ui/styles'
import { AppBar, Toolbar, Typography, Link, Tabs, Tab, Container } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

import IndexView from './view/IndexView.js'
import NotificationListPage from './view/NotificationListPage.js'
import ScoreboardView from './view/ScoreboardView.js'
import TeamScoreView from './view/TeamScoreView.js'
import NotFoundView from './view/NotFoundView.js'
import CompetitionInfoBarView from './view/CompetitionInfoBarView.js'
import NotificationTabLabelView from './view/NotificationTabLabelView.js'
import eventManager from './util/eventManager.js'

import EventLiveView from './view/EventLiveView.js'
import EventHistoryPage from './view/EventHistoryPage.js'

import customLogo from 'Branding/logo.js'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    marginBottom: theme.spacing(2),
    '& .emoji': {
      verticalAlign: 'middle',
      maxHeight: '1em'
    }
  },
  footer: {
    textAlign: 'center',
    padding: theme.spacing(2),
    marginTop: 'auto',
    color: grey['300'],
    backgroundColor: grey['800']
  },
  title: {
    flexGrow: 1
  },
  link: {
    color: grey['200'],
    fontWeight: 500
  },
  headerLogo: customLogo.headerStyle
})

class App extends Component {
  constructor (props) {
    super(props)
    this.handleTabActivate = this.handleTabActivate.bind(this)
  }

  handleTabActivate (event, newValue) {
    this.props.history.push(newValue)
  }

  componentDidMount () {
    eventManager.connect()
  }

  componentWillUnmount () {
    eventManager.disconnect()
  }

  render () {
    const { classes } = this.props

    let selectedTab = false
    const tabs = [
      <Tab key='home' label='Home' value='/' />,
      <Tab key='scoreboard' label='Scoreboard' value='/scoreboard' />,
      <Tab key='notifications' label={(this.props.identity.isInternal() || this.props.identity.isTeam()) ? <NotificationTabLabelView /> : 'Notifications'} value='/notifications' />
    ]

    const possiblePaths = [
      '/',
      '/scoreboard',
      '/notifications'
    ]

    if (this.props.identity.isTeam()) {
      possiblePaths.push('/team/stats')
      tabs.push(<Tab key='team/stats' label='Stats' value='/team/stats' />)
    }

    if (this.props.identity.isInternal()) {
      possiblePaths.push('/event/live')
      tabs.push(<Tab key='event/live' label='Event live' value='/event/live' />)
      possiblePaths.push('/event/history')
      tabs.push(<Tab key='event/history' label='Event history' value='/event/history' />)
    }

    if (possiblePaths.indexOf(this.props.location.pathname) !== -1) {
      selectedTab = this.props.location.pathname
    }

    return (
      <div className={classes.root}>
        <Container className={classes.main} maxWidth={false}>
          <AppBar position='static'>
            <Toolbar>
              {
                (() => {
                  if (customLogo.header) {
                    return (
                      <img className={classes.headerLogo} src={customLogo.header} alt={this.props.customContent.competitionTitle} />
                    )
                  }
                  return null
                })()
              }
              <Typography variant='h5' color='inherit' className={classes.title}>
                {this.props.customContent.competitionTitle}
              </Typography>
              <Tabs value={selectedTab} onChange={this.handleTabActivate}>
                {tabs}
              </Tabs>
            </Toolbar>
          </AppBar>
          <CompetitionInfoBarView />
          <Switch>
            <Route path='/' exact render={props => <IndexView {...props} identity={this.props.identity} customContent={this.props.customContent} />} />
            <Route path='/scoreboard' render={props => <ScoreboardView {...props} identity={this.props.identity} customContent={this.props.customContent} />} />
            <Route path='/notifications' render={props => <NotificationListPage {...props} identity={this.props.identity} customContent={this.props.customContent} />} />
            {
              (() => {
                if (this.props.identity.isInternal()) {
                  return (
                    <Route path='/team/:teamIdStr/stats' render={props => <TeamScoreView {...props} identity={this.props.identity} customContent={this.props.customContent} />} />
                  )
                }
                return null
              })()
            }
            {
              (() => {
                if (this.props.identity.isInternal()) {
                  return [
                    <Route key={0} path='/event/history' render={props => <EventHistoryPage {...props} identity={this.props.identity} customContent={this.props.customContent} />} />,
                    <Route key={1} path='/event/live' render={props => <EventLiveView {...props} identity={this.props.identity} customContent={this.props.customContent} />} />
                  ]
                }
                return null
              })()
            }
            {
              (() => {
                if (this.props.identity.isTeam()) {
                  return (
                    <Route path='/team/stats' render={props => <TeamScoreView {...props} identity={this.props.identity} customContent={this.props.customContent} />} />
                  )
                }
                return null
              })()
            }
            <Route render={props => <NotFoundView {...props} identity={this.props.identity} customContent={this.props.customContent} />} />
          </Switch>
        </Container>
        <footer className={classes.footer}>
          <Container maxWidth={false}>
            <Typography variant='body2'>
              &copy; 2011 &ndash; {(new Date()).getFullYear()} <Link href='https://volgactf.ru/en/' target='_blank' rel='noopener' className={classes.link}>VolgaCTF</Link>. Made in Samara, Russia.
            </Typography>
            <Typography variant='body2'>
              Find this project on <Link href='https://github.com/VolgaCTF/volgactf-final' target='_blank' rel='noopener' className={classes.link}>GitHub</Link>
            </Typography>
          </Container>
        </footer>
      </div>
    )
  }
}

App.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  identity: PropTypes.object.isRequired,
  customContent: PropTypes.object.isRequired
}

export default withStyles(styles)(withRouter(App))
