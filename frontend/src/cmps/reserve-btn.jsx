import * as React from 'react'
import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button'

const useStyles = makeStyles({
  root: {
    background: 'radial-gradient(circle at left,#FF385C 0%,#E61E4D 27.5%,#E31C5F 40%,#D70466 57.5%,#BD1E59 75%,#BD1E59 100%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: '#fff !important',
    height: 50,
    padding: '0 30px',
    width:'100%',
    type:'submit',
    '--x': 'left',
    '&:hover': {
      background: 'radial-gradient(circle at var(--x),#FF385C 0%,#E61E4D 27.5%,#E31C5F 40%,#D70466 57.5%,#BD1E59 75%,#BD1E59 100%)'
    },
  },
})

export function ReserveBtn() {
  const classes = useStyles()
  return <Button className={`${classes.root} reserve`}>Reserve</Button>
}
