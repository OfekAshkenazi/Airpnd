import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { disable } from 'workbox-navigation-preload';

import IconArrows_circle_minus from '../assets/svg/minus-icon.jsx';
import IconArrows_circle_plus from '../assets/svg/plus-icon.jsx';
import { orderService } from '../services/order.service.local.js';
import { updateOrder } from '../store/system.action.js';
import { TotalExpenses } from './total-expenses.jsx';

export function FilterWhoModal() {
  const { order } = useSelector(storeState => storeState.systemModule)
  const { guests } = order
  const { adults, children, infants, pets } = guests

  console.log(order)
  console.log(guests)
  console.log(adults)
  useEffect(() => {
    console.log('hihihi')
  }, [order])


  function handleAdultsChange(diff) {
    let newAdults = adults + diff
    // (newAdults === -1) ? newAdults = 0 : newAdults
    order.guests.adults = newAdults
    updateOrder(order)
  }

  function handleChildrenChange(diff) {
    let newChildren = children + diff
    order.guests.children = newChildren
    updateOrder(order)
  }

  function handleInfantsChange(diff) {
    let newInfants = infants + diff
    order.guests.infants = newInfants
    updateOrder(order)
  }

  function handlePetsChange(diff) {
    let newPets = pets + diff
    order.guests.pets = newPets
    updateOrder(order)
  }


  return (

    <section className='filter-who-modal'>
      <div className='guest-select flex'>
        <div className='guest-select-contant'>
          <p>Adults</p>
          <p>Ages 13 or above</p>
        </div>
        <div className='modal-btn-group '>
          <button onClick={() => handleAdultsChange(-1)} className={`${(adults === 1) ? "disable-btn" : ""}`}><IconArrows_circle_minus /></button>
          <span>{order.guests.adults}</span>
          <button onClick={() => handleAdultsChange(+1)}><IconArrows_circle_plus /></button>
        </div>
      </div>

      <div className='guest-select flex'>
        <div className='guest-select-contant'>
          <p>Children</p>
          <p>Ages 2–12</p>
        </div>
        <div className='modal-btn-group'>
          <button onClick={() => handleChildrenChange(-1)} className={`${(children === 0) ? "disable-btn" : ""}`} ><IconArrows_circle_minus /></button>
          <span>{order.guests.children}</span>
          <button onClick={() => handleChildrenChange(+1)}><IconArrows_circle_plus /></button>
        </div>
      </div>

      <div className='guest-select flex'>
        <div className='guest-select-contant'>
          <p>Infants</p>
          <p>Under 2</p>
        </div>
        <div className='modal-btn-group'>
          <button onClick={() => handleInfantsChange(-1)} className={`${(infants === 0) ? "disable-btn" : ""}`}><IconArrows_circle_minus /></button>
          <span>{order.guests.infants}</span>
          <button onClick={() => handleInfantsChange(+1)}><IconArrows_circle_plus /></button>
        </div>
      </div>

      <div className='guest-select flex'>
        <div className='guest-select-contant'>
          <p>Pets</p>
          <p className='flex'>Bringing a service animal?</p>
        </div>
        <div className='modal-btn-group'>
          <button onClick={() => handlePetsChange(-1)} className={`${(pets === 0) ? "disable-btn" : ""}`}><IconArrows_circle_minus /></button>
          <span>{order.guests.pets}</span>
          <button onClick={() => handlePetsChange(+1)}><IconArrows_circle_plus /></button>
        </div>
      </div>
    </section >
  )
}