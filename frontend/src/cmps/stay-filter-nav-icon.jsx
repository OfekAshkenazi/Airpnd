import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { IconFiltering } from '../assets/svg/filtring-icon';
import { labels } from '../services/stay.service.local';

export function NavIconFilter() {
    // const pageSize = 10
    // let [idx, setIdx] = useState(0)
    // let startIdx = pageSize * idx
    // let labelPage = labels.slice(startIdx, startIdx + pageSize)
    // // let startIdx = pageSize * idx
    // // let labelPage = labels.slice(idx, idx + pageSize)


    function onOpenFilterModal() {
        // console.log('hi')
    }
    // function pagination(diff) {
    //     if (idx < 0) {
    //     idx += diff
    //         idx = 0
    //     }
    //     setIdx(idx)
    // }

    return (
        <section className='icon-nav'>
            <div className="filter-icon-pagination">
                <button>⬅️</button>
                <button >➡️</button>
            </div>
            {labels.slice(0, 12).map(label => {
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