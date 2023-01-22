import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { IconFiltering } from '../assets/svg/filtring-icon';
import { labels } from '../services/stay.service.local';

export function NavIconFilter() {

    function goLeft() {

    }
    // function pagination(diff) {
    //     if (idx < 0) {
    //     idx += diff
    //         idx = 0
    //     }
    //     setIdx(idx)
    // }

    function goRight() {

    }
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