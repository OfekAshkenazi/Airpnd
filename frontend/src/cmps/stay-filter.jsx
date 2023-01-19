import { faAngry, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { stayService } from '../services/stay.service.local';
import { utilService } from '../services/util.service';
import { onSetFilter } from '../store/stay.actions';

export function StayFilter() {
    const [filterByToEdit, setFilterBy] = useState(stayService.getEmptyFilter())
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [isFilterExtend, setIsFilterExtend] = useState(false)
    // onSetFilter = useRef(utilService.debounce(onSetFilter))

    // useEffect(() => {
    //     console.log('check how many times useEffect work', filterBy);
    // }, [])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'range') ? +value : value
        setFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)

    }

    function openAnywhere() {
        setIsFilterExtend(true)
    }

    return (
        <section className="stay-filter-header">

            {!isFilterExtend &&
                <div onClick={openAnywhere} className="stay-filter-btns">
                    <button className="stay-filter-btn"> Anywhere |</button>
                    <button className="stay-filter-btn">Any week |</button>
                    <button className="stay-filter-btn" style={{ color: '#717171' }}>Add guests </button>
                    <button className="stay-filter-btn serach"> <FontAwesomeIcon icon={faMagnifyingGlass} className='icon-search' /></button>
                </div>}

            {isFilterExtend &&

                <form onSubmit={onFilter} className='stay-filter-form'>
                    <label >
                        <span className='fix-text'>St.</span>
                        <input type="text" name="txt" id="txt" value={filterByToEdit.txt} onChange={handleChange} placeholder="Anywhere" className='filter-input' />
                    </label>
                    <label >
                        <input type="text" name="txt" id="txt" value={filterByToEdit.txt} onChange={handleChange} placeholder="Anywhere" className='filter-input' />
                    </label>
                    <label >
                        <input type="text" name="txt" id="txt" value={filterByToEdit.txt} onChange={handleChange} placeholder="Anywhere" className='filter-input' />
                    </label>
                    <label >
                        <input type="text" name="txt" id="txt" value={filterByToEdit.txt} onChange={handleChange} placeholder="Anywhere" className='filter-input' />
                    </label>
                    <button>save</button>
                </form>}
        </section>
    )
}