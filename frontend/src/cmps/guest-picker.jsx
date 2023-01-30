import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { updateOrder } from '../store/order.action';

export function GuestPicker() {
  const order = useSelector(storeState => storeState.orderModule.order)

  function handleGuestChange(type, diff) {
    const orderToSave = structuredClone(order)
    orderToSave.guests[type] += diff
    updateOrder(orderToSave)
  }

  return (
    <section className='dropdown'>
      <div className='guest-type'>
        <div className="content">Adults <span className="description">Age 13+</span> </div>
        <div className='btns'>
          <button className={`guest-btn ${order.guests.adults === 0 ? 'disabled' : ''}`} disabled={(order.guests.adults === 1) ? true : false}
            onClick={() => handleGuestChange('adults', -1)}><FontAwesomeIcon icon={faMinus} /></button>
          <span>{order.guests.adults}</span>
          <button className='guest-btn' onClick={() => handleGuestChange('adults', +1)}><FontAwesomeIcon icon={faPlus} /></button>
        </div>
      </div>
      <div className='guest-type'>
        <div className="content">Childern <span className="description">Age 2-12</span> </div>
        <div className='btns'>
          <button className={`guest-btn ${order.guests.children === 0 ? 'disabled' : ''}`} disabled={(order.guests.children === 0) ? true : false}
            onClick={() => handleGuestChange('children', -1)}><FontAwesomeIcon icon={faMinus} /></button>
          <span>{order.guests.children}</span>
          <button className='guest-btn' onClick={() => handleGuestChange('children', +1)}><FontAwesomeIcon icon={faPlus} /></button>
        </div>
      </div>
      <div className='guest-type'>
        <div className="content">Infants <span className="description">Under 2</span> </div>
        <div className='btns'>
          <button className={`guest-btn ${order.guests.infants === 0 ? 'disabled' : ''}`} disabled={(order.guests.infants === 0) ? true : false}
            onClick={() => handleGuestChange('infants', -1)}><FontAwesomeIcon icon={faMinus} /></button>
          <span>{order.guests.infants}</span>
          <button className='guest-btn' onClick={() => handleGuestChange('infants', +1)}><FontAwesomeIcon icon={faPlus} /></button>
        </div>
      </div>
      <div className='guest-type'>
        <div className="content">Pets <span className="description-pets">Bringing a service animal?</span> </div>
        <div className='btns'>
          <button className={`guest-btn ${order.guests.pets === 0 ? 'disabled' : ''}`} disabled={(order.guests.pets === 0) ? true : false}
            onClick={() => handleGuestChange('pets', -1)}><FontAwesomeIcon icon={faMinus} /></button>
          <span>{order.guests.pets}</span>
          <button className='guest-btn' onClick={() => handleGuestChange('pets', +1)}><FontAwesomeIcon icon={faPlus} /></button>
        </div>
      </div>
    </section >
  )
}

