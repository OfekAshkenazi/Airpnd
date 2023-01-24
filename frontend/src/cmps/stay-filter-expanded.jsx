import { display } from '@mui/system';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import IconBxSearch from '../assets/svg/search-magnifying';
import { stayService } from '../services/stay.service.local';
import { onSetFilter } from '../store/stay.actions';
import { FilterWhereModal } from './filter-where-modal';
import { FilterWhoModal } from './filter-who-modal';

export function StayFilterExpanded({ isGuestModalOpen, isWhereModalOpen, onAddGuest, onAddWhere }) {
  const [filterByToEdit, setFilterBy] = useState(stayService.getEmptyFilter())
  const { isFilterExpanded } = useSelector(storeState => storeState.filterExpandedModule)


  function handleChange({ target }) {
    let { value, name: field, type } = target
    value = (type === 'range') ? +value : value
    setFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  const data = {
    checkIn: 'Add dates',
    checkOut: 'Add dates',
    who: 'Add guests',
  }





  return (
    <section className={`stay-filter-expanded `}>
      <div className={`con ${(isFilterExpanded) ? "show" : "hidden"}`}>
        <form onSubmit={onFilter} className={`stay-filter-form ${(isWhereModalOpen) ? "active" : ""}`}>

          <div className={`filter-where `} onClick={() => onAddWhere()}>
            <label className='filter-where-label'>
              <p>Where</p>
              <input type="text" name="txt" id="txt" value={filterByToEdit.txt} onChange={handleChange} placeholder="Search destinations" className='filter-where-input unbold' />
            </label>
            {isWhereModalOpen ? <FilterWhereModal /> : ''}
          </div>
        </form>
        <span></span>

        {/* <div className='filter-check-in'> */}
        <button className='filter-check-in font' onClick={() => { }}>
          <div>
            <p>Check-in</p>
            <p className='unbold'>{`${data.checkIn}`}</p>
          </div>
        </button>
        {/* </div> */}
        <span></span>

        <button className='filter-check-out' onClick={() => { }}>
          <div>
            <p>Check-out</p>
            <p className='unbold'>{`${data.checkIn}`}</p>
          </div>
        </button>
        <span></span>

        <div className={`filter-who ${(isGuestModalOpen) ? "active" : ""}`} onClick={() => onAddGuest()}>
          <div className='filter-who-content'>
            <p>Who</p>
            <p className='unbold'>{`${data.checkIn}`}</p>
            {isGuestModalOpen ? <FilterWhoModal /> : ''}
          </div>
          <button className='btn-search-filter' onClick={() => { }}>
            <p className='search-icon'><IconBxSearch className='search-icon' /></p>
            <p className='search-word'>Search</p>
          </button>
        </div>
      </div>
    </section >
  )
}