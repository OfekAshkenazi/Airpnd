import * as React from 'react'
import { useNavigate, NavLink, useSearchParams, useParams } from 'react-router-dom'
import { updateOrder } from '../store/system.action'
import { userService } from '../services/user.service'

export function ReserveBtn({ order, numericDate, stay, totalPrice }) {
  let { stayId } = useParams()
  const { startDate, endDate, guests } = order[0]
  const { adults, children, infants, pets } = guests
  const navigate = useNavigate()
  
  async function onAddNewOrder(order, stay) {
    try {
      order[0].stayId = stay._id
      order[0].totalPrice = totalPrice
      order[0].hostId = '63cfe8da8276fe4e2c861da4'
      order[0].byUser = userService.getLoggedinUser()
      await updateOrder(order[0])
      navigate(`/book/stays/${stayId}/${adults}/${children}/${infants}/${pets}/${startDate}/${endDate}`)
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
