
export const SET_FILTER_EXPANDED = 'SET_FILTER_EXPANDED'
export const SET_FILTER_EXPANDEDUSER = 'SET_FILTER_EXPANDEDUSER'

const initialState = {
    isFilterExpanded: false,
    isFilterExpandedUser: false,
}

export function filterExpandedReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_FILTER_EXPANDED:
            newState = { ...state, isFilterExpanded: action.status }
            break
        case SET_FILTER_EXPANDEDUSER:
            newState = { ...state, isFilterExpandedUser: action.status }
            break

        default:
    }
    return newState
}
