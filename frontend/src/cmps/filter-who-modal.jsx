import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { disable } from 'workbox-navigation-preload';

import IconArrows_circle_minus from '../assets/svg/minus-icon.jsx';
import IconArrows_circle_plus from '../assets/svg/plus-icon.jsx';
import { orderService } from '../services/order.service.local.js';
import { updateOrder } from '../store/order.action.js';
import { TotalExpenses } from './total-expenses.jsx';

export function FilterWhoModal({ setWhoCounter, whoCounter }) {
  const order = useSelector(storeState => storeState.orderModule.order)


  useEffect(() => {
    countGuests()

  }, [order])
  function countGuests() {
    let count = parseInt(order.guests.adults) + parseInt(order.guests.children) + parseInt(order.guests.infants) + parseInt(order.guests.pets)
    setWhoCounter(count)

  }

  function handleAdultsChange(diff) {
    order.guests.adults += diff
    updateOrder(order)
    // countGuests()
  }

  function handleChildrenChange(diff) {
    order.guests.children += diff
    updateOrder(order)
    // countGuests()
  }

  function handleInfantsChange(diff) {
    order.guests.infants += diff
    updateOrder(order)
    // countGuests()
  }

  function handlePetsChange(diff) {
    order.guests.pets += diff
    updateOrder(order)
    countGuests()
  }


  return (

    <section className='filter-who-modal'>
      <div className='guest-select flex'>
        <div className='guest-select-contant'>
          <p>Adults</p>
          <p className='unbold'>Ages 13 or above</p>
        </div>
        <div className='modal-btn-group '>
          <button onClick={() => handleAdultsChange(-1)} className={`${(order.guests.adults === 1) ? "disable-btn" : ""}`} disabled={(order.guests.adults === 1) ? true : false}><IconArrows_circle_minus /></button>
          <span>{order.guests.adults}</span>
          <button onClick={() => handleAdultsChange(+1)}><IconArrows_circle_plus /></button>
        </div>
      </div>

      <div className='guest-select flex'>
        <div className='guest-select-contant'>
          <p>Children</p>
          <p className='unbold'>Ages 2–12</p>
        </div>
        <div className='modal-btn-group'>
          <button onClick={() => handleChildrenChange(-1)} className={`${(order.guests.children === 0) ? "disable-btn" : ""}`} disabled={(order.guests.children === 0) ? true : false} ><IconArrows_circle_minus /></button>
          <span>{order.guests.children}</span>
          <button onClick={() => handleChildrenChange(+1)}><IconArrows_circle_plus /></button>
        </div>
      </div>

      <div className='guest-select flex'>
        <div className='guest-select-contant'>
          <p>Infants</p>
          <p className='unbold'>Under 2</p>
        </div>
        <div className='modal-btn-group'>
          <button onClick={() => handleInfantsChange(-1)} className={`${(order.guests.infants === 0) ? "disable-btn" : ""}`} disabled={(order.guests.infants === 0) ? true : false}><IconArrows_circle_minus /></button>
          <span>{order.guests.infants}</span>
          <button onClick={() => handleInfantsChange(+1)}><IconArrows_circle_plus /></button>
        </div>
      </div>

      <div className='guest-select flex'>
        <div className='guest-select-contant'>
          <p>Pets</p>
          <p className='unbold'>Bringing a service animal?</p>
        </div>
        <div className='modal-btn-group'>
          <button onClick={() => handlePetsChange(-1)} className={`${(order.guests.pets === 0) ? "disable-btn" : ""}`} disabled={(order.guests.pets === 0) ? true : false}><IconArrows_circle_minus /></button>
          <span>{order.guests.pets}</span>
          <button onClick={() => handlePetsChange(+1)}><IconArrows_circle_plus /></button>
        </div>
      </div>
    </section >
  )
}