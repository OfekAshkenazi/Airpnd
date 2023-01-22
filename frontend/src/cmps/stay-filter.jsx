import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import { getActionFilterExpanded } from '../store/filter.expanded.action';

export function StayFilter() {

    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

    function openFilterExpanded() {
        getActionFilterExpanded(true)
    }

    function closeFilterExpanded() {
        getActionFilterExpanded(false)
    }

    return (
        <section className="stay-filter-header">

            <button onClick={closeFilterExpanded}>close</button>
            <div onClick={openFilterExpanded} className="stay-filter-btns">
                <button className="stay-filter-btn"> Anywhere</button>
                <span></span>
                <button className="stay-filter-btn">Any week</button>
                <span></span>
                <button className="stay-filter-btn" style={{ color: '#717171' }}>Add guests</button>
                <button className="stay-filter-btn serach"> <FontAwesomeIcon icon={faMagnifyingGlass} className='icon-search' /></button>
            </div>
        </section>
    )
}