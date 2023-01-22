import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { IconFiltering } from '../assets/svg/filtring-icon';
import { labels } from '../services/stay.service.local';

export function NavIconFilter() {
    const [idx, setIdx] = useState(0)
    const pageSize = 12
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

    return (
        <section className='icon-nav'>
            <div className="filter-icon-pagination">
                <button onClick={() => { pagination(-1) }} className='icons-left'><FontAwesomeIcon icon={faAngleLeft} /></button>
                <button onClick={() => { pagination(+1) }} className='icons-right'><FontAwesomeIcon icon={faAngleRight} /></button>
            </div>
            {labelsPage.map(label => {
                return <NavLink key={label} to="/" style={{ textDecoration: 'none' }}>
                    <div className='icon-preview'>
                        <img src={require(`../assets/icon-nav-filter/${label}.png`)} alt="" />
                        <p>Cabins</p>
                    </div>
                </NavLink>
            })}
            {/* <button className="btn-icon-filter"><IconFiltering /> Filters</button> */}
        </section >
    )
}