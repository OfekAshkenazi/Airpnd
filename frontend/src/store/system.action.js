import { orderService } from '../services/order.service.local.js';
import { store } from './store.js'
import { TOOGLE_DETAILS_ON, TOOGLE_DETAILS_OFF, TOOGLE_LOGIN_MODAL_ON, TOOGLE_LOGIN_MODAL_OFF } from "./system.reducer.js";

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
export async function ToggleLoginModal(isLoginModalOpen) {
  try {
    const type = isLoginModalOpen ? TOOGLE_LOGIN_MODAL_ON : TOOGLE_LOGIN_MODAL_OFF
    store.dispatch({
      type: type,
      isLoginModalOpen
    })

  } catch (err) {
    throw err
  }
}

// export async function updateOrder(order) {
//   try {
//     store.dispatch({type:SET_ORDER, order})
//   }
//   catch (err) {
//     console.error('Cannot update stay')
//     throw err
//   }
// }