import { useState } from 'react';

import IconBxSearch from '../assets/svg/search-magnifying';
import { stayService } from '../services/stay.service.local';
import { onSetFilter } from '../store/stay.actions';

export function StayFilterExpanded() {
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
    <section className="stay-filter-expanded">
      <form onSubmit={onFilter} className='stay-filter-form'>

        <div className='filter-where'>
          <label className='filter-where-label'>
            <input type="text" name="txt" id="txt" value={filterByToEdit.txt} onChange={handleChange} placeholder="where" className='filter-where-input' />
          </label>
        </div>

        <div className='filter-check-in'>
          <label className='filter-check-in-label'>
            <input type="text" name="txt" id="txt" value={filterByToEdit.txt} onChange={handleChange} placeholder="check-in" className='filter-check-in-input' />
          </label>
        </div>

        <div className='filter-check-out'>
          <label className='filter-check-out-label'>
            <input type="text" name="txt" id="txt" value={filterByToEdit.txt} onChange={handleChange} placeholder="check-out" className='filter-check-out-input' />
          </label>
        </div>

        <div className='filter-who'>
          <label className='filter-who-label'>
            <input type="text" name="txt" id="txt" value={filterByToEdit.txt} onChange={handleChange} placeholder="who" className='filter-who-input' />
          </label>

        </div>
        <button className='btn-search-filter'><IconBxSearch />search</button>
      </form>
    </section >
  )
}