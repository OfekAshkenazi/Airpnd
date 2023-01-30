import { store } from './store.js';
import { orderService } from '../services/order.service.local.js';
import { SET_ORDER, ADD_ORDER, REMOVE_ORDER, SET_ORDERS, UPDATE_ORDER } from './order.reducer.js';

export async function loadOrders() {
  try {
    const orders = await orderService.query()
    // console.log(orders)
    store.dispatch({
      type: SET_ORDERS,
      orders
    })
    return orders
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function updateOrder(order) {
  try {
    store.dispatch({ type: SET_ORDER, order })
  }
  catch (err) {
    console.error('Cannot update order')
    throw err
  }
}
// export async function removeStay(stayId) {
//     try {
//         await stayService.remove(stayId)
//         store.dispatch(getActionRemoveStay(stayId))
//     } catch (err) {
//         console.log('Cannot remove stay', err)
//         throw err
//     }
// }

export async function addOrder(order) {
  try {
    const savedOrder = await orderService.save(order)
    store.dispatch({ type: ADD_ORDER, order })
    return savedOrder
  } catch (err) {
    console.log('Cannot add stay', err)
    throw err
  }
}

export async function updateOrderStatus(order) {
  try {
    const savedOrder = await orderService.update(order)
    store.dispatch({ type: UPDATE_ORDER, order })
    return savedOrder
  } catch (err) {
    console.log(err)
    throw err
  }
}
