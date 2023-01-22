import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { IconFiltering } from '../assets/svg/filtring-icon';
import { labels } from '../services/stay.service.local';

export function NavIconFilter() {

    function goLeft() {

    }

    function goRight() {

    }
    console.log('labels:', labels)
    return (
        <section className='icon-nav'>
            <div className='filter-icon-pagination'>
                <button className='first'>⬅️</button>
                <button onClick={goRight} className='second'>➡️</button>
            </div>
            <section className='flex'>
                {labels.map(label => {
                    return <NavLink key={label} to="/" style={{ textDecoration: 'none' }}>
                        <div className='icon-preview'>
                            <img src={require(`../assets/icon-nav-filter/${label}.png`)} alt="" />
                            <p>Cabins</p>
                        </div>
                    </NavLink>
                })}
            </section>
            <button className="btn-icon-filter"><IconFiltering /> Filters</button>
        </section >


    )
}