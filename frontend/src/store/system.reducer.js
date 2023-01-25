import { orderService } from "../services/order.service.local"

export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const TOOGLE_DETAILS_ON = 'TOOGLE_DETAILS_ON'
export const TOOGLE_DETAILS_OFF = 'TOOGLE_DETAILS_OFF'
export const SET_ORDER = 'SET_ORDER'

const initialState = {
  isLoading: false,
  isDetailsOpen: false,
  order: orderService.getEmptyOrder()
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case TOOGLE_DETAILS_ON:
      return { ...state, isDetailsOpen: true }
    case TOOGLE_DETAILS_OFF:
      return { ...state, isDetailsOpen: false }
    case SET_ORDER:
      return { ...state, order: action.order }
    default: return state
  }
}
