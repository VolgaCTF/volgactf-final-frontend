import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/styles'
import { Typography, TableRow, TableCell } from '@material-ui/core'

const styles = theme => ({
  root: {
    fontWeight: 'bold'
  }
})

class TeamScoreTableHeaderView extends Component {
  render () {
    const cells = this.props.order.map((column, ndx) => {
      const header = this.props.headers[column]
      return (
        <TableCell key={ndx} align="left">
          <Typography variant="body2" component="span" color="textPrimary" className={this.props.classes.root}>
            {header.title}
          </Typography>
        </TableCell>
      )
    })

    return (
      <TableRow>
        {cells}
      </TableRow>
    )
  }
}

TeamScoreTableHeaderView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TeamScoreTableHeaderView)
