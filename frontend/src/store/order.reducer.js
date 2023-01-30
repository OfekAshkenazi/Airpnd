import { orderService } from "../services/order.service.local"

export const SET_ORDERS = 'SET_ORDERS'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const ADD_ORDER = 'ADD_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const SET_FILTER = 'SET_FILTER'
export const SET_ORDER = 'SET_ORDER'

const initialState = {
    orders: [],
    order: orderService.getEmptyOrder()

}

export function orderReducer(state = initialState, action) {
    let newState = state
    let orders
    switch (action.type) {
        case SET_ORDERS:
            newState = { ...state, orders: action.orders }
            break
        case REMOVE_ORDER:
            const lastRemovedorder = state.orders.find(order => order._id === action.orderId)
            orders = state.orders.filter(order => order._id !== action.orderId)
            newState = { ...state, orders, lastRemovedorder }
            break
        case ADD_ORDER:
            newState = { ...state, orders: [...state.orders, action.order] }
            break
        case UPDATE_ORDER:
            orders = state.orders.map(order => (order._id === action.order._id) ? action.order : order)
            newState = { ...state, orders }
            break
        case SET_ORDER:
            return { ...state, order: {...action.order} }
        default:
    }
    return newState
}
