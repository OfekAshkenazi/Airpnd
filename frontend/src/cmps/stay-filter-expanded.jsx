import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import IconBxSearch from '../assets/svg/search-magnifying';
import { stayService } from '../services/stay.service.js';
import { utilService } from '../services/util.service';
import { getActionFilterExpanded } from '../store/filter.expanded.action';
import { onSetFilter } from '../store/stay.actions';
import { FilterDatesModal } from './filter-dates-modal';
import { FilterWhereModal } from './filter-where-modal';
import { FilterWhoModal } from './filter-who-modal';

export function StayFilterExpanded({ isGuestModalOpen, isWhereModalOpen, isDateModalOpen, onAddGuest, onAddWhere, onDateModal, whoCounter, setWhoCounter }) {
  const { isFilterExpanded } = useSelector(storeState => storeState.filterExpandedModule)
  const order = useSelector(storeState => storeState.orderModule.order)

  const [searchParams, setSearchParams] = useSearchParams()
  const queryFilterBy = stayService.getFilterFromSearchParams(searchParams)
  const [filterByToEdit, setFilterByToEdit] = useState(queryFilterBy)

  useEffect(() => {
    setSearchParams(filterByToEdit)
    onSetFilter(filterByToEdit)
  }, [])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    value = (type === 'range') ? +value : value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onFilter(ev) {
    ev.preventDefault()
    setSearchParams(filterByToEdit)
    onSetFilter(filterByToEdit)
  }

  const data = {
    checkIn: 'Add dates',
    checkOut: 'Add dates',
    who: 'guests',
  }

  function closeModal() {
    getActionFilterExpanded(false)
  }

  function searchClick(ev) {
    ev.stopPropagation()
    getActionFilterExpanded(false)
  }


  return (
    <section className={`stay-filter-expanded `}>
      <div className={`con ${(isFilterExpanded) ? "show" : "hidden"}`}>
        <form onSubmit={onFilter} className={`stay-filter-form ${(isWhereModalOpen) ? "active" : ""}`}>

          <div className={`filter-where`} onClick={() => onAddWhere()}>
            <label className='filter-where-label'>
              <p>Where</p>
              <input type="text" name="txt" id="txt" value={filterByToEdit.txt} onChange={handleChange} placeholder="Search destinations" className='filter-where-input unbold' />
            </label>
            {isWhereModalOpen ? <FilterWhereModal setFilterByToEdit={setFilterByToEdit} filterByToEdit={filterByToEdit} /> : ''}
          </div>
          {/* </form> */}
          <span></span>

          {/* <div className='filter-check-in'> */}

          <button type="button" className={`filter-check-in ${(isDateModalOpen) ? "active" : ""} font`} onClick={() => { onDateModal() }}>
            <div>
              <p>Check-in</p>
              <p className='unbold'>{`${(order.startDate) ? utilService.numericDate(order.startDate) : data.checkIn}`}</p>
            </div>

            {isDateModalOpen && <FilterDatesModal />}
          </button>

          {/* </div> */}
          <span></span>

          <button type="button" className={`filter-check-out ${(isDateModalOpen) ? "active" : ""}`} onClick={() => { onDateModal() }}>
            <div>
              <p>Check-out</p>
              <p className='unbold'>{`${(order.endDate) ? utilService.numericDate(order.endDate) : data.checkOut}`}</p>
            </div>
          </button>
          <span></span>

          <div className={`filter-who ${(isGuestModalOpen) ? "active" : ""}`} onClick={() => onAddGuest()}>
            <div className='filter-who-content'>
              <p>Who</p>
              <p className={`unbold`}>{`${(whoCounter > 1) ? whoCounter + ' guest' : data.who}`}</p>
              {isGuestModalOpen ? <FilterWhoModal setWhoCounter={setWhoCounter} whoCounter={whoCounter} /> : ''}
            </div>

            <button className='btn-search-filter' onClick={(event) => { searchClick(event) }}>
              <p className='search-icon'><IconBxSearch className='search-icon' /></p>
              <p className='search-word'>Search</p>

            </button>
          </div>
        </form>
      </div>
    </section >
  )
}