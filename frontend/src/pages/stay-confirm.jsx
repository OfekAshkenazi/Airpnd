import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { stayService } from '../services/stay.service'
import { updateOrder } from '../store/system.action'
import { orderService } from '../services/order.service.local'
import { PropagateLoader } from 'react-spinners';
import { useEffect } from 'react'

export function StayConfirm() {
  const order = useSelector(storeState => storeState.systemModule.order)
  let navigate = useNavigate()
  const params = useParams()
  const { stayId, startDate, endDate, adults, children, infants, pets } = params
  useEffect(() => {
  }, [order])

  function handleBackClick() {
    navigate(-1)
  }

  if (order.stay._id === '') getCurrOrder()
  async function getCurrOrder() {
    try {
      const stay = await stayService.getById(stayId)
      order.stay = stay
      order.guests.adults = parseInt(adults)
      order.guests.children = parseInt(children)
      order.guests.infants = parseInt(infants)
      order.guests.pets = parseInt(pets)
      // order.endDate = new Date()
      // order.startDate = new Date()
      setOrder(stay)
    } catch (error) {
      console.log(error)
    }
  }

  async function setOrder(stay) {
    try {
      const updatedOrder = { ...order, stay: stay }
      await updateOrder(updatedOrder)
    }
    catch (err) {
      console.log(err)
    }
  }

  async function onAddNewOrder() {
    try {
      await orderService.add(order)
      navigate(`/orders/my-orders`)
    }
    catch (err) {
      console.log(err)
    }
  }

  function getDayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return dayDiff
  }

  if (order.stay._id === '') {
    return <div className="loader"><PropagateLoader color="#ff395c" /></div>
  }

  return <section className="stay-confirm">
    <div className="main-line">
      <button className="back-btn" onClick={handleBackClick}>
        <img className="back-img" src={require(`../assets/img/icons/back.png`)} />
      </button>
      <h1>Confirm and book</h1>
    </div>
    <div className="order-sum">
      <div className="left-side">
        <p className="trip">Your trip</p>
        <div className="trip-sum">
          <div className="dates">
            <div className="left">Dates <span>{(stayService.extractDate(startDate))}- {(stayService.extractDate(endDate))}</span>
            </div>
          </div>
          <div className="guests">
            <div className="left">Guests<span>{(parseInt(adults) + parseInt(children) + parseInt(infants) + parseInt(pets))}</span>  </div>
          </div>
          <button className="book-btn" onClick={() => onAddNewOrder()}>Book and pay </button>
        </div>
      </div>
      <div className="modal">
        <div className="modal-top">
          <img className="img-confirm" src={order.stay.imgUrls[0]} />
          <div className="modal-info">
            <span className="prop-type">{order.stay.type}</span>
            <span className="prop-name">{order.stay.name}</span>
          </div>
        </div>
        <div className="air-cover">Your booking is protected by  <img className="back-img" src={require(`../assets/img//aircover.png`)} />
        </div>
        <div className="price-details">
          <div className="price">Price details</div>
          <div className="sum"><div className="sum-left">${order.stay.price} USD x {getDayDifference(order.startDate, order.endDate)} nights </div><div className="sum-right">${order.totalPrice}</div></div>
        </div>
        <div className="total">Total (USD) <span className="total-num">${order.totalPrice}</span> </div>
        <div className="deposit">This property requires a $1,100.91 security deposit. It will be collected separately by the property prior to your arrival or at check-in.</div>
      </div>
    </div>
  </section>
}