export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const TOOGLE_DETAILS_ON = 'TOOGLE_DETAILS_ON'
export const TOOGLE_DETAILS_OFF = 'TOOGLE_DETAILS_OFF'

const initialState = {
  isLoading: false,
  isDetailsOpen: false
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
    default: return state
  }
}
