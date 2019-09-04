import React, { Component } from 'react'

import { TableCell, Typography } from '@material-ui/core'

import numeral from 'numeral'

export default class ScoreTableScoreCellView extends Component {
  render () {
    return (
      <TableCell>
        <Typography variant='body2' component='span' color={this.props.muted ? 'textSecondary' : 'initial'}>
          {numeral(this.props.value).format('0.00')}
        </Typography>
      </TableCell>
    )
  }
}
