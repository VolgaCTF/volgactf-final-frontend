import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/styles'
import { Grid, ButtonGroup, Button } from '@material-ui/core'

const styles = theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
})

class PaginationView extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (page) {
    return (e) => {
      this.props.onPageChange(page)
    }
  }

  render () {
    const numPages = Math.floor(this.props.total / this.props.pageSize) + (this.props.total % this.props.pageSize > 0 ? 1 : 0)
    const numPrevItems = 3
    const numNextItems = 3

    return (
      <Grid item xs={12} className={this.props.classes.root}>
        <ButtonGroup fullWidth>
          <Button color='primary' disabled={this.props.page === 1} onClick={this.handleClick(this.props.page - 1)}>Previous</Button>

          {
            (() => {
              const items = []
              for (let i = 1; i <= numPages; ++i) {
                if (i < this.props.page) {
                  if (i === 1) {
                    items.push(<Button key={i} color='primary' onClick={this.handleClick(i)}>{i}</Button>)
                  } else if (this.props.page - i <= numPrevItems) {
                    items.push(<Button key={i} color='primary' onClick={this.handleClick(i)}>{i}</Button>)
                  } else if (this.props.page - i === numPrevItems + 1) {
                    items.push(<Button key={i} disabled color='primary'>...</Button>)
                  }
                } else if (i > this.props.page) {
                  if (i === numPages) {
                    items.push(<Button key={i} color='primary' onClick={this.handleClick(i)}>{i}</Button>)
                  } else if (i - this.props.page <= numNextItems) {
                    items.push(<Button key={i} color='primary' onClick={this.handleClick(i)}>{i}</Button>)
                  } else if (i - this.props.page === numNextItems + 1) {
                    items.push(<Button key={i} disabled color='primary'>...</Button>)
                  }
                } else {
                  items.push(<Button key={i} variant='contained' color='primary'>{i}</Button>)
                }
              }
              return items
            })()
          }

          <Button color='primary' disabled={this.props.page === numPages} onClick={this.handleClick(this.props.page + 1)}>Next</Button>
        </ButtonGroup>
      </Grid>
    )
  }
}

PaginationView.propTypes = {
  classes: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired
}

export default withStyles(styles)(PaginationView)
