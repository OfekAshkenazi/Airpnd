import { useEffect, useState } from 'react';

import { showErrorMsg } from '../services/event-bus.service';
import { orderService } from '../services/order.service.local';

export function HostOrders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    onLoadOrders()
  }, [])
  console.log(orders)
  async function onLoadOrders() {
    try {
      const hostOrders = await orderService.query()
      setOrders(hostOrders)
    } catch (err) {
      console.log(err)
      showErrorMsg('Cannot load orders')
    }
  }

  return (
    <section className='host-orders'>
      <div className="host-orders-headline flex">
        <h4>Buyer</h4>
        <h4>StayName</h4>
        <h4>Date</h4>
        <h4>Price</h4>
        <h4>Status</h4>
      </div>
      <div className="order-status flex">
        <div className="orders-left-side flex">
          <div className="user-img-order-container">
            <img src={require("../assets/user-img/svg-face.jpg")} alt="" />
          </div>
          {/* <p>{orders[0].byUser.fullname}</p> */}
          <p>Guy Place</p>
        </div>
        <div className="order-right-side flex">
          {/* <p>{orders[0].startDate.slice(0, 9)}</p> */}
        </div>
      </div>
    </section>
  )
}