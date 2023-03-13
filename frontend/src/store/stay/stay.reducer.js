import { stayService } from '../../services/stay.service';

export const SET_STAYS = 'SET_STAYS'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'
export const UNDO_REMOVE_STAY = 'UNDO_REMOVE_STAY'
export const SET_FILTER = 'SET_FILTER'
export const SET_WISHES = 'SET_WISHES'

const initialState = {
    stays: [],
    lastRemovedStay: null,
    filterBy: stayService.getEmptyFilter(),
    wishes: []
}

export function stayReducer(state = initialState, action) {
    var newState = state
    var stays
    switch (action.type) {
        case SET_STAYS:
            newState = { ...state, stays: action.stays }
            break
        case REMOVE_STAY:
            const lastRemovedStay = state.stays.find(stay => stay._id === action.stayId)
            stays = state.stays.filter(stay => stay._id !== action.stayId)
            newState = { ...state, stays, lastRemovedStay }
            break
        case ADD_STAY:
            newState = { ...state, stays: [...state.stays, action.stay] }
            break
        case UPDATE_STAY:
            stays = state.stays.map(stay => (stay._id === action.stay._id) ? action.stay : stay)
            newState = { ...state, stays }
            break
        case UNDO_REMOVE_STAY:
            if (state.lastRemovedStay) {
                newState = { ...state, stays: [...state.stays, state.lastRemovedStay], lastRemovedStay: null }
            }
            break
        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }
        case SET_WISHES:
            return newState = { ...state, wishes: action.wishes }
        default:
    }
    return newState
}
