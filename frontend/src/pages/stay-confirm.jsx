import { useNavigate} from 'react-router-dom'

import { orderService } from '../services/order.service.local'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function StayConfirm() {
    const navigate = useNavigate()

    const order = orderService.getEmptyOrder()

    async function onAddNewOrder() {
        try {
          let newOrder = orderService.getEmptyOrder()
          await orderService.add(newOrder)
          showSuccessMsg('Order been sent')
          navigate('/orders')
        } catch (err) {
          console.log(err)
          showErrorMsg('Cannot make new order')
        }
      }
    return <section className="stay-confirm">
        <div className="main-line"><button className="back-btn"> back</button> <h1>Request to book</h1></div>

        <div className="order-sum">
            <div className="left-side">
            <p>Your trip</p>
            <div className="dates"><div className="left">Dates <span>dates...</span> </div><button className="edit-btn">Edit</button>
            </div>
            <div className="guests"><div className="left">Guests <span>guests</span> </div><button className="edit-btn">Edit</button>
            </div>
            <button className="book-btn" onClick={() => onAddNewOrder()}>Book Now </button>
            </div>
            <div className="modal">
            </div>
        </div>
    </section>
}