import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { stayService } from '../services/stay.service.local';
import { utilService } from '../services/util.service';
import { onSetFilter } from '../store/stay.actions';

export function StayFilter() {
    const [filterByToEdit, setFilterBy] = useState(stayService.getEmptyFilter())
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
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

    return (
        <section className="stay-filter-header">
            <form onSubmit={onFilter}>
                <label >
                    <input type="text" name="txt" id="txt" value={filterByToEdit.txt} onChange={handleChange} placeholder="By place" className='filter-input' />
                </label>
                <button>save</button>
            </form>
        </section>
    )
}