import React, { Component } from 'react'

import { Typography, TableCell } from '@material-ui/core'

import numeral from 'numeral'

export default class TeamScoreTableScoreCellView extends Component {
  render () {
    return (
      <TableCell>
        <Typography variant="body2" component="span">
          {numeral(this.props.value).format('0.00')}
        </Typography>
      </TableCell>
    )
  }
}
