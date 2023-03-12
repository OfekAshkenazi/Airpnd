import { SET_FILTER_EXPANDED } from './filter.expanded.reducer.js';
import { SET_FILTER_EXPANDEDUSER } from './filter.expanded.reducer.js';
import { store } from './store.js';

export function getActionFilterExpanded(status) {
    store.dispatch({
        type: SET_FILTER_EXPANDED,
        status
    })
}
export function getActionFilterExpandedUser(status) {
    store.dispatch({
        type: SET_FILTER_EXPANDEDUSER,
        status
    })
}

