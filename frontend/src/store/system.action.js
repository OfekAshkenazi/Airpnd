import { orderService } from '../services/order.service.local.js';
import { store } from './store.js'
import { TOOGLE_DETAILS_ON, TOOGLE_DETAILS_OFF, SET_ORDER } from "./system.reducer.js";

export async function ToggleDetails(isDetailsOpen) {
  try {
    const type = isDetailsOpen ? TOOGLE_DETAILS_ON : TOOGLE_DETAILS_OFF
    store.dispatch({
      type: type,
      isDetailsOpen
    })

  } catch (err) {
    throw err
  }
}

export async function updateOrder(order) {
  try {
    console.log('from store')
    // const newOrder = await orderService.add(order)
    store.dispatch({SET_ORDER, order})
  }
  catch (err) {
    console.error('Cannot update stay')
    throw err
  }
}