import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { updateOrder } from '../../store/order.action'
import { userService } from '../../services/user.service'
import { showErrorMsg } from '../../services/event-bus.service'

export function ReserveBtn({ order, numericDate, stay, totalPrice }) {

  const navigate = useNavigate()

  async function onAddNewOrder(order, stay) {
    try {
      if (!userService.getLoggedinUser()) {
        showErrorMsg('Pls log in to reserve')
      }
      order.stayId = stay._id
      order.totalPrice = totalPrice
      order.hostId = '640db35e73bada2644efdcc9'
      order.byUser = userService.getLoggedinUser()
      navigate(`/book/stays/${order.stayId}/${order.guests.adults}/${order.guests.children}/${order.guests.infants}/${order.guests.pets}/${order.startDate}/${order.endDate}`)
    } catch (err) { console.log(err) }
  }

  return <div className="btn-container" onClick={() => onAddNewOrder(order, stay)}>
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
