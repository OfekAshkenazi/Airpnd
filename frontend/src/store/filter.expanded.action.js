import { SET_FILTER_EXPANDED } from './filter.expanded.reducer.js';
import { store } from './store.js';

// Action Creators:
export function getActionFilterExpanded(status) {
    store.dispatch({
        type: SET_FILTER_EXPANDED,
        status
    })
}

// export function getActionFilterExpandedClose() {
//     return {
//         type: SET_FILTER_EXPANDED_CLOSE,
//     }
// }

