import { useState } from 'react';

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
      </form>
    </section>
  )
}