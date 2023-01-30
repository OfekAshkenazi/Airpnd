import * as React from 'react'
import { useNavigate, NavLink, useSearchParams, useParams } from 'react-router-dom'
import { updateOrder } from '../store/order.action'
import { userService } from '../services/user.service'
import { useSelector } from 'react-redux'

export function ReserveBtn({ order, numericDate, stay, totalPrice }) {
  // const order1 = useSelector(storeState => storeState.orderModule.order)

  const navigate = useNavigate()
  
  async function onAddNewOrder(order, stay) {
    try {
      order.stayId = stay._id
      order.totalPrice = totalPrice
      order.hostId = '63cfe8da8276fe4e2c861da4'
      order.byUser = userService.getLoggedinUser()
      await updateOrder(order)
      navigate(`/book/stays/${order.stayId}/${order.guests.adults}/${order.guests.children}/${order.guests.infants}/${order.guests.pets}/${order.startDate}/${order.endDate}`)
    } catch (err) { console.log(err) }
  }

  return  <div className="btn-container" onClick={() => onAddNewOrder(order, stay)}>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="cell"></div>
  <div className="reserve-content">
    <button className="reserve-btn">
      <span className='reserve-txt'>Reserve</span>
    </button>
  </div>
</div>
}
