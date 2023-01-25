import * as React from 'react'
import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button'
import { useNavigate, NavLink } from 'react-router-dom'
import { orderService } from '../services/order.service.local'
import { updateOrder } from '../store/system.action'

const useStyles = makeStyles({
  root: {
    // display:'flex !important',
    // justifyContent:'center !important',
    // alignItems: 'center !important',
    textTransform: 'none !important',
    fontWeight: '600 !important',
    // marginTop: '12px !important',
    marginBottom: '16px !important',
    textAlign: 'center !important',
    alignItems: 'center !important',
    textDecoration: 'none !important',
    background: 'radial-gradient(circle at left,#FF385C 0%,#E61E4D 27.5%,#E31C5F 40%,#D70466 57.5%,#BD1E59 75%,#BD1E59 100%)',
    border: 0,
    borderRadius: '10px !important',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: '#fff !important',
    height: 50,
    width: '90%',
    transition: '1s',
    type: 'submit',
    '--x': 'left',
    '&:hover': {
      background: 'radial-gradient(circle at var(--x),#FF385C 0%,#E61E4D 27.5%,#E31C5F 40%,#D70466 57.5%,#BD1E59 75%,#BD1E59 100%)'
    },
  },
})

export function ReserveBtn({ order, numericDate, stay }) {
  const classes = useStyles()
  const navigate = useNavigate()

  async function onAddNewOrder(order, stay) {
    try {
      order[0].stayId =  stay._id
      await updateOrder(order[0])
      navigate('/orders')
    } catch (err) { console.log(err) }
  }
  return <NavLink to="/book/stays" className={classes.root}
  ><Button onClick={() => onAddNewOrder(order, stay)} className={classes.root}>Reserve</Button>
  </NavLink>
}
