import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { stayService } from '../services/stay.service'
import { updateOrder } from '../store/system.action'
import { orderService } from '../services/order.service.local'
import { HotelSharp } from '@mui/icons-material'

export function StayConfirm() {
  const order = useSelector(storeState => storeState.systemModule.order)
  let navigate = useNavigate()
  const params = useParams()
  const { stayId, startDate, endDate, adults, children, infants, pets } = params

  function handleBackClick() {
    navigate(-1)
  }

  if (order.stay._id === '') getCurrOrder()

  async function getCurrOrder() {
    try {
      const stay = await stayService.getById(stayId)
      order.stay = stay
      order.guests.adults = adults
      order.guests.children = children
      order.guests.infants = infants
      order.guests.pets = pets
      order.endDate = endDate
      order.startDate = startDate
      setOrder()

    } catch (error) {
      console.log(error)
    }
  }

  async function setOrder() {
    try {
      await updateOrder(order)
    }
    catch (err) {
      console.log(err)
    }
  }

  async function onAddNewOrder() {
    try {
      // order[0].stayId = stay._id
      await orderService.add(order)
      navigate(`/stay/${stayId}`)
    }
    catch (err) {
      console.log(err)
    }
  }

  if (order.stay._id === '') {
    return <section>Loading...</section>
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
        <p>Your trip</p>
        <div className="dates">
          <div className="left">Dates <span>{(stayService.extractDate(startDate))}- {(stayService.extractDate(endDate))}</span>
          </div>
        </div>
        <div className="guests">
          <div className="left">Guests<span>{(parseInt(adults) + parseInt(children) + parseInt(infants) + parseInt(pets))}</span>  </div>
        </div>
        <button className="book-btn" onClick={() => onAddNewOrder()}>Book Now </button>
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
          <div className="price">Price Details</div>
          <div className="sum">1,963.29$ x 5 night <span>9816.45$</span></div>
        </div>
        <div className="total">Total ($) <span className="total-num">9,816.45$</span> </div>
        <div className="deposit">This property requires a 1,100.91$ security deposit. It will be collected separately by the property prior to your arrival or at check-in.</div>
      </div>
    </div>
  </section>
}