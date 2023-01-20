import { useState } from 'react';

import IconBxSearch from '../assets/svg/search-magnifying';
import { stayService } from '../services/stay.service.local';
import { onSetFilter } from '../store/stay.actions';

export function StayFilterExpanded({ setIsFilterExpanded, isFilterExpanded }) {
  const [filterByToEdit, setFilterBy] = useState(stayService.getEmptyFilter())

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
    <section className={`stay-filter-expanded`}>
      <form onSubmit={onFilter} className={`stay-filter-form ${(isFilterExpanded) ? "show" : "hidden"}`}>

        <div className='filter-where'>
          <label className='filter-where-label'>
            <p>where</p>
            <input type="text" name="txt" id="txt" value={filterByToEdit.txt} onChange={handleChange} placeholder="Search destinations" className='filter-where-input' />
          </label>
        </div>

        <div className='filter-check-in'>
          <label className='filter-check-in-label'>
            <p>check-in</p>
            <input type="text" name="txt" id="txt" value={filterByToEdit.txt} onChange={handleChange} placeholder="Add dates" className='filter-check-in-input' />
          </label>
        </div>

        <div className='filter-check-out'>
          <p>check-out</p>
          {/* check-out */}
          <label className='filter-check-out-label'>
            <input type="text" name="txt" id="txt" value={filterByToEdit.txt} onChange={handleChange} placeholder="Add dates" className='filter-check-out-input' />
          </label>
        </div>

        <div className='filter-who'>
          hello
          <label className='filter-who-label'>
            <input type="text" name="txt" id="txt" value={filterByToEdit.txt} onChange={handleChange} placeholder="who" className='filter-who-input' />
            <button className='btn-search-filter'><IconBxSearch />search</button>
          </label>

        </div>
      </form>
    </section >
  )
}