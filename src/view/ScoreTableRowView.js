import React, { Component } from 'react'

import { TableRow, TableCell, Typography } from '@material-ui/core'

import ScoreTablePositionCellView from './ScoreTablePositionCellView.js'
import ScoreTableServiceStateCellView from './ScoreTableServiceStateCellView.js'
import ScoreTableTotalScoreCellView from './ScoreTableTotalScoreCellView.js'
import ScoreTableScoreCellView from './ScoreTableScoreCellView.js'
import ScoreTableTeamCellView from './ScoreTableTeamCellView.js'

export default class ScoreTableRowView extends Component {
  render () {
    const cells = this.props.order.map((column, ndx) => {
      const value = this.props.data[column]
      if (column === 'rank') {
        return <ScoreTablePositionCellView key={ndx} value={value} trend={this.props.data.trend} muted={this.props.muted} />
      } else if (column.lastIndexOf('#service_') === 0) {
        return <ScoreTableServiceStateCellView key={ndx} value={value} />
      } else if (column === 'totalPoints') {
        return <ScoreTableTotalScoreCellView key={ndx} value={value} lastAttack={this.props.data.lastAttack} muted={this.props.muted} />
      } else if (column === 'attackPoints') {
        return <ScoreTableScoreCellView key={ndx} value={value} muted={this.props.muted} />
      } else if (column === 'availabilityPoints') {
        return <ScoreTableScoreCellView key={ndx} value={value} muted={this.props.muted} />
      } else if (column === 'defencePoints') {
        return <ScoreTableScoreCellView key={ndx} value={value} muted={this.props.muted} />
      } else if (column === 'team') {
        return <ScoreTableTeamCellView key={ndx} value={value} identity={this.props.identity} guest={this.props.data.guest} teamId={this.props.data.id} teamLogoHash={this.props.data.logoHash} />
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
