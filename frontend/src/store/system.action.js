import { store } from './store.js'
import { TOOGLE_DETAILS_ON, TOOGLE_DETAILS_OFF } from "./system.reducer.js";

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