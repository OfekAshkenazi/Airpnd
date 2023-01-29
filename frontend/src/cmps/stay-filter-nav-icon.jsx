import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useSearchParams } from 'react-router-dom';

import { labels, stayService } from '../services/stay.service';
import { onSetFilter } from '../store/stay.actions';

export function NavIconFilter() {
    const { isFilterExpanded } = useSelector(storeState => storeState.filterExpandedModule)
    const [searchParams, setSearchParams] = useSearchParams()
    const queryFilterBy = stayService.getFilterFromSearchParams(searchParams)
    const [filterByToEdit, setFilterByToEdit] = useState(queryFilterBy)

    const [idx, setIdx] = useState(0)
    const pageSize = 14
    const pageDiff = 4
    const startLabel = idx * pageDiff
    let labelsPage = labels.slice(startLabel, startLabel + pageSize)

    useEffect(() => {
        labelsPage = labels.slice(startLabel, startLabel + pageSize)
    }, [idx]
    )

    function pagination(diff) {
        let index = idx
        index = index + diff
        if (index < 0) {
            index = 0
        }
        else if (
            labels.length - (startLabel + pageSize) < 0
        ) {
            index = index - 1
            setIdx(idx)
        }
        setIdx(index)

    }

    function onFilterByLabel(Currlabel) {
        filterByToEdit.label = Currlabel
        console.log(filterByToEdit)
        setSearchParams(filterByToEdit)
        onSetFilter(filterByToEdit)
    }

    return (
        <section className='icon-nav-container'>
            <div className='icon-nav'>
                {!isFilterExpanded && <div className="filter-icon-pagination">
                    <button onClick={() => pagination(-1)} className={`icons-left ${(idx === 0) ? 'start' : ''}`}><FontAwesomeIcon icon={faAngleLeft} /></button>
                    <button onClick={() => pagination(+1)} className={`icons-right ${(idx === 12) ? 'end' : ''}`}><FontAwesomeIcon icon={faAngleRight} /></button>
                </div>}
                {
                    labelsPage.map(label => {
                        return (
                            <div key={label} className='icon-preview' onClick={() => onFilterByLabel(label)}>
                                <img src={require(`../assets/icon-nav-filter/${label}.png`)} alt="" />
                                <p onClick={() => onFilterByLabel(label)}>{`${label}`}</p>
                            </div>
                        )
                    })
                }
                {/* <button className="btn-icon-filter"><IconFiltering /> Filters</button> */}
            </div>
        </section >
    )
}