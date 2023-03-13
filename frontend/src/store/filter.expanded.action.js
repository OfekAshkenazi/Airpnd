import { SET_FILTER_EXPANDED } from './filter.expanded.reducer.js';
import { SET_FILTER_EXPANDEDUSER } from './filter.expanded.reducer.js';
import { store } from './store.js';

export function getActionFilterExpanded(status) {
    store.dispatch({
        type: SET_FILTER_EXPANDED,
        status
    })
    fixHeightForHeader()
   
}
export function getActionFilterExpandedUser(status) {
    store.dispatch({
        type: SET_FILTER_EXPANDEDUSER,
        status
    })
}

export function fixHeightForHeader() {
    const elContainer = document.querySelector('.stay-filter-expanded')
    elContainer.style.height === '150px' ? elContainer.style.height = '0px' : elContainer.style.height = '150px'
}
