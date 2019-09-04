import React, { Component } from 'react'

import { TableCell, Typography } from '@material-ui/core'

import numeral from 'numeral'
import moment from 'moment'

export default class ScoreTableTotalScoreCellView extends Component {
  render () {
    return (
      <TableCell>
        <Typography variant='body2' component='span' color={this.props.muted ? 'textSecondary' : 'initial'}>
          {numeral(this.props.value).format('0.00')}
        </Typography>
        {
          (() => {
            if (this.props.lastAttack === null) {
              return null
            }
            return [
              <br key={0} />,
              <Typography key={1} variant='caption' component='span' color={this.props.muted ? 'textSecondary' : 'initial'}>
                last attack at {moment(this.props.lastAttack).format('HH:mm:ss')}
              </Typography>
            ]
          })()
        }
      </TableCell>
    )
  }
}
