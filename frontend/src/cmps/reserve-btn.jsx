import * as React from 'react'
import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button'
import { orderService } from '../services/order.service.local'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    textTransform: 'none !important',
    fontWeight: '600 !important',
    marginTop: '12px !important',
    background: 'radial-gradient(circle at left,#FF385C 0%,#E61E4D 27.5%,#E31C5F 40%,#D70466 57.5%,#BD1E59 75%,#BD1E59 100%)',
    border: 0,
    borderRadius: '8px !important',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: '#fff !important',
    height: 50,
    width: '100%',
    type: 'submit',
    '--x': 'left',
    '&:hover': {
      background: 'radial-gradient(circle at var(--x),#FF385C 0%,#E61E4D 27.5%,#E31C5F 40%,#D70466 57.5%,#BD1E59 75%,#BD1E59 100%)'
    },
  },
})

export function ReserveBtn() {
  const classes = useStyles()

  const navigate = useNavigate()

  async function onAddNewOrder() {
    try {
      const newOrder = orderService.getEmptyOrder()
      await orderService.add(newOrder)
      showSuccessMsg('Order been sent')
      navigate('/orders')
    } catch (err) {
      console.log(err)
      showErrorMsg('Cannot make new order')
    }
  }

  return <Button onClick={() => onAddNewOrder()} className={classes.root}>Reserve</Button>
}
