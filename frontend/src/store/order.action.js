import { useSelector } from 'react-redux';
import { orderService } from '../services/order.service.local.js';
import { ADD_ORDER, REMOVE_ORDER, SET_ORDERS, UPDATE_ORDER } from './order.reducer.js';
import { store } from './store.js';


export async function loadOrders() {
    try {
        const orders = await orderService.query()
        console.log(orders)
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

// export async function removeStay(stayId) {
//     try {
//         await stayService.remove(stayId)
//         store.dispatch(getActionRemoveStay(stayId))
//     } catch (err) {
//         console.log('Cannot remove stay', err)
//         throw err
//     }
// }

// export async function addStay(stay) {
//     try {
//         const savedStay = await stayService.save(stay)
//         store.dispatch(getActionAddStay(savedStay))
//         return savedStay
//     } catch (err) {
//         console.log('Cannot add stay', err)
//         throw err
//     }
// }

// export async function updateStay(stay) {
//     try {
//         const savedStay = await stayService.save(stay)
//         store.dispatch(getActionUpdateStay(savedStay))
//         return savedStay
//     } catch (err) { console.log(err); throw err }
// }
