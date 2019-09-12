import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  }
}))

export default function TeamSelectView (props) {
  const classes = useStyles()
  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  return (
    <FormControl variant='outlined' className={classes.root}>
      <InputLabel ref={inputLabel} htmlFor='notifySelect'>
        Notify
      </InputLabel>
      <Select autoWidth disabled={Object.prototype.hasOwnProperty.call(props, 'disabled') ? props.disabled : false} value={props.value} onChange={props.onChange} labelWidth={labelWidth} inputProps={{ id: 'notifySelect' }}>
        {
          (() => {
            return [
              <MenuItem key={0} value={0}>All</MenuItem>
            ].concat(props.teams.map(team => <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>))
          })()
        }
      </Select>
    </FormControl>
  )
}
