import { NavLink } from 'react-router-dom';

import { IconFiltering } from '../assets/svg/filtring-icon';
import { labels } from '../services/stay.service.local';

export function NavIconFilter() {


    function onOpenFilterModal() {
        console.log('hi')
    }

    // {`stay-filter-form ${(isFilterExpanded) ? "show" : "hidden"}`}
    
    return (
        <section className='icon-nav'>
            {labels.map(label => {
                return <NavLink key={label} to="/"><img style={{ width: '20px' }} src={require(`../assets/icon-nav-filter/${label}.png`)} alt="" /></NavLink>
            })}

            <button onClick={onOpenFilterModal()} className="btn-icon-filter"><IconFiltering /> Filters</button>
        </section>


    )
}