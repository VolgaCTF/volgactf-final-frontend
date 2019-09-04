import React, { Component } from 'react'

import { Table, TableBody, TableHead } from '@material-ui/core'

import ScoreTableHeaderView from './ScoreTableHeaderView.js'
import ScoreTableRowView from './ScoreTableRowView.js'

export default class ScoreTableView extends Component {
  render () {
    const rows = this.props.table.rows.map((row, ndx) => {
      return (
        <ScoreTableRowView key={row.id} identity={this.props.identity} order={this.props.table.order} data={row} muted={this.props.table.muted} />
      )
    })

    return (
      <Table size='small'>
        <TableHead>
          <ScoreTableHeaderView order={this.props.table.order} headers={this.props.table.headers} muted={this.props.table.muted} />
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    )
  }
}
