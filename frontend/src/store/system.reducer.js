import { orderService } from "../services/order.service.local"

export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const TOOGLE_DETAILS_ON = 'TOOGLE_DETAILS_ON'
export const TOOGLE_DETAILS_OFF = 'TOOGLE_DETAILS_OFF'
export const SET_ORDER = 'SET_ORDER'
export const TOOGLE_LOGIN_MODAL_ON = 'TOOGLE_LOGIN_MODAL_ON'
export const TOOGLE_LOGIN_MODAL_OFF = 'TOOGLE_LOGIN_MODAL_OFF'

const initialState = {
  isLoading: false,
  isDetailsOpen: false,
  isLoginModalOpen: false,
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
    case TOOGLE_LOGIN_MODAL_ON:
      return { ...state, isLoginModalOpen: true }
    case TOOGLE_LOGIN_MODAL_OFF:
      return { ...state, isLoginModalOpen: false }
    case SET_ORDER:
      return { ...state, order: action.order }
    default: return state
  }
}
