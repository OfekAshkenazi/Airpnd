import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { stayService } from '../services/stay.service'
import { updateOrder } from '../store/system.action'
import { orderService } from '../services/order.service.local'

export function StayConfirm() {
  const order = useSelector(storeState => storeState.systemModule.order)
  let navigate = useNavigate()
  const params = useParams()
  const { stayId, startDate, endDate, adults, children, infants, pets } = params
  function handleBackClick() {
    navigate(-1)
  }

  console.log(order)

  // if (order.stay._id === '') order.stay = stayService.getById(stayId)
  // console.log(order)
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

  return <section className="stay-confirm">
    <div className="main-line"><button className="back-btn" onClick={handleBackClick}> back</button> <h1>Request to book</h1></div>
    <div className="order-sum">
      <div className="left-side">
        <p>Your trip</p>
        <div className="dates"><div className="left">Dates <span>{(stayService.extractDate(startDate))}-{(stayService.extractDate(endDate))}</span>
        </div>
        </div>
        <div className="guests"><div className="left">Guests<span>{(parseInt(adults) + parseInt(children) + parseInt(infants) + parseInt(pets))}</span>  </div>
        </div>
        <button className="book-btn" onClick={() => onAddNewOrder()}>Book Now </button>
      </div>
      <div className="modal">
        <div className="modal-top">
          <div className="modal-info">
            <span>{order.stay.type}</span>
            <span>{order.stay.name}</span>
          </div>
          {/* <img className="img-confirm" src={order.stay.imgUrls[0]} /> */}
        </div>
      </div>
    </div>
  </section>
}