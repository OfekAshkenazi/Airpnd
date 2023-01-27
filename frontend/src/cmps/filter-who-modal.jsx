import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import IconArrows_circle_minus from '../assets/svg/minus-icon.jsx';
import IconArrows_circle_plus from '../assets/svg/plus-icon.jsx';
import { orderService } from '../services/order.service.local.js';
import { updateOrder } from '../store/system.action.js';
import { TotalExpenses } from './total-expenses.jsx';

export function FilterWhoModal() {
  let order = useSelector(storeState => storeState.systemModule.order)
  console.log(order)
  useEffect(() => {
    console.log('hihihi')
  }, [])


  async function handleAdultsChange(diff) {
    try {

      // await updateOrder(copyOrder)
    } catch (err) {
      console.log(err)
    }
  }

  //   guests{
  //     "adults": 1,
  //     "children": 0,
  //     "infants": 0,
  //     "pets": 0
  // }
  return (
    <section className='filter-who-modal'>
      <TotalExpenses />
      <div className='guest-select flex'>
        <div className='guest-select-contant'>
          <p>Adults</p>
          <p>Ages 13 or above</p>
        </div>
        <div className='modal-btn-group '>
          <button onClick={() => handleAdultsChange(-1)}><IconArrows_circle_minus /></button>
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
          <button onClick={() => handleAdultsChange(-1)}><IconArrows_circle_minus /></button>
          <span>{order.guests.children}</span>
          <button onClick={() => handleAdultsChange(+1)}><IconArrows_circle_plus /></button>
        </div>
      </div>

      <div className='guest-select flex'>
        <div className='guest-select-contant'>
          <p>Infants</p>
          <p>Under 2</p>
        </div>
        <div className='modal-btn-group'>
          <button onClick={() => handleAdultsChange(-1)}><IconArrows_circle_minus /></button>
          <span>{order.guests.infants}</span>
          <button onClick={() => handleAdultsChange(+1)}><IconArrows_circle_plus /></button>
        </div>
      </div>

      <div className='guest-select flex'>
        <div className='guest-select-contant'>
          <p>Pets</p>
          <p className='flex'>Bringing a service animal?</p>
        </div>
        <div className='modal-btn-group'>
          <button onClick={() => handleAdultsChange(-1)}><IconArrows_circle_minus /></button>
          <span>{order.guests.pets}</span>
          <button onClick={() => handleAdultsChange(+1)}><IconArrows_circle_plus /></button>
        </div>
      </div>
    </section>
  )
}