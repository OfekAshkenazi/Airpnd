import { faAngry, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { stayService } from '../services/stay.service.local';
import { utilService } from '../services/util.service';
import { onSetFilter } from '../store/stay.actions';
import { StayFilterExpanded } from './stay-filter-expanded';

export function StayFilter({ isFilterExpanded, setIsFilterExpanded }) {

    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

    // onSetFilter = useRef(utilService.debounce(onSetFilter))

    // useEffect(() => {
    //     console.log('check how many times useEffect work', filterBy);
    // }, [])

    function openAnywhere() {
        setIsFilterExpanded(true)
    }

    return (
        <section className="stay-filter-header">

            {!isFilterExpanded &&
                <div onClick={openAnywhere} className="stay-filter-btns">
                    <button className="stay-filter-btn"> Anywhere |</button>
                    <button className="stay-filter-btn">Any week |</button>
                    <button className="stay-filter-btn" style={{ color: '#717171' }}>Add guests </button>
                    <button className="stay-filter-btn serach"> <FontAwesomeIcon icon={faMagnifyingGlass} className='icon-search' /></button>
                </div>}
        </section>
    )
}