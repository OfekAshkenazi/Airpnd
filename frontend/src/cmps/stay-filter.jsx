import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import IconMapPin from '../assets/svg/location-icon';
import { getActionFilterExpanded } from '../store/filter.expanded.action';

export function StayFilter({ onAddGuest, onAddWhere, onDateModal, whoCounter }) {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    // const { isFilterExpanded } = useSelector(storeState => storeState.filterExpandedModule)

    function openFilterExpanded() {
        getActionFilterExpanded(true)
    }

    return (
        <section className="stay-filter-header">

            <div onClick={openFilterExpanded} className="stay-filter-btns">
                <button className="stay-filter-btn any-where" onClick={onAddWhere}>{(filterBy.txt !== '') ? filterBy.txt : 'Anywhere'} </button>
                <span></span>
                <button className="stay-filter-btn any-week" onClick={onDateModal}>Any week</button>
                <span></span>
                <button className="stay-filter-btn add-guests" onClick={onAddGuest}>{(whoCounter > 1) ? whoCounter + ' guests' : 'Add guests'}</button>
                <button className="stay-filter-btn search"> <FontAwesomeIcon icon={faMagnifyingGlass} className='icon-search' /></button>

                <button className="stay-filter-btn location"> <IconMapPin /></button>
            </div>
        </section>
    )
}
