import React, { Component }from 'react'

import { TableRow, TableCell, Typography } from '@material-ui/core'

import TeamScoreTableScoreCellView from './TeamScoreTableScoreCellView.js'

export default class TeamScoreTableRowView extends Component {
  render () {
    const cells = this.props.order.map((column, ndx) => {
      const value = this.props.data[column]
      if (['totalPoints', 'attackPoints', 'availabilityPoints', 'defencePoints'].indexOf(column) !== -1) {
        return <TeamScoreTableScoreCellView key={ndx} value={value} />
      }
      return (
        <TableCell key={ndx}>
          <Typography variant="body2" component="span">
            {value}
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
