import React, { Component } from 'react'

import { Table, TableBody, TableHead } from '@material-ui/core'

import TeamScoreTableHeaderView from './TeamScoreTableHeaderView.js'
import TeamScoreTableRowView from './TeamScoreTableRowView.js'

export default class TeamScoreTableView extends Component {
  render () {
    const rows = this.props.table.rows.map((row, ndx) => {
      return (
        <TeamScoreTableRowView key={row.id} identity={this.props.identity} order={this.props.table.order} data={row} />
      )
    })

    return (
      <Table size="small">
        <TableHead>
          <TeamScoreTableHeaderView order={this.props.table.order} headers={this.props.table.headers} />
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    )
  }
}
