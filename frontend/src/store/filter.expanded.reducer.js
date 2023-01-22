import { stayService } from '../services/stay.service.local';

export const SET_FILTER_EXPANDED = 'SET_FILTER_EXPANDED'

const initialState = {
    isFilterExpanded: false,
}

export function filterExpandedReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_FILTER_EXPANDED:
            newState = { ...state, isFilterExpanded: action.status }
            break

        // case SET_FILTER_EXPANDED_CLOSE:
        //     newState = { ...state, isFilterExpanded: false }
        //     break

        default:
    }
    return newState
}
