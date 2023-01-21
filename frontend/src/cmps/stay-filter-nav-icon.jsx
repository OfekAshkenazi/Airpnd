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
    //     idx += diff
    //     if (idx < 0) {
    //         idx = 0
    //     }
    //     setIdx(idx)
    // }

    return (
        <section className='icon-nav'>
            {/* <button onClick={() => { pagination(-1) }}>⬅️</button> */}
            {labels.map(label => {
                return <NavLink key={label} to="/" style={{ textDecoration: 'none' }}>
                    <div className='icon-preview'>
                        <img src={require(`../assets/icon-nav-filter/${label}.png`)} alt="" />
                        <p>Cabins</p>
                    </div>
                </NavLink>
            })}
            {/* <button onClick={() => { pagination(+1) }}>➡️</button> */}
            <button className="btn-icon-filter"><IconFiltering /> Filters</button>
        </section >


    )
}