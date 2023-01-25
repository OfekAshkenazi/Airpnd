import { useEffect, useState } from 'react';

import { showErrorMsg } from '../services/event-bus.service';
import { orderService } from '../services/order.service.local';

export function HostOrders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    onLoadOrders()
  }, [])
  async function onLoadOrders() {
    try {
      const hostOrders = await orderService.query()
      setOrders(hostOrders)
    } catch (err) {
      console.log(err)
      showErrorMsg('Cannot load orders')
    }
  }
  // function handleChange({ target }) {
  //   let { value, name: field, type } = target
  //   value = (type === 'range') ? +value : value
  //   setFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
  // }


  async function handelSelectChange(event, orderId) {
    let { value } = event.target
    try {
      const orderToSave = await orderService.getById(orderId)
      orderToSave.status = value
      await orderService.update(orderToSave)
    } catch (err) {
      console.log(err)
      showErrorMsg('Cannot complete request')
    }
    console.log(value)
    console.log(orderId)

  }

  if (!orders.length) return <h2>loading...</h2>
  return (
    <section className='host-orders'>
      <div className="host-orders-headline flex">
        <h4>Buyer</h4>
        <h4>StayName</h4>
        <h4>Date</h4>
        <h4>Price</h4>
        <h4>Status</h4>
        <h4></h4>
      </div>
      <div className="order-status align-center flex">
        <div className="orders-left-side align-center flex">
          <div className="flex align-center">
            <div className="user-img-order-container">
              <img src={require("../assets/user-img/anglina.jpg")} alt="" />
            </div>
            <p>{orders[0].byUser.fullname}</p>
          </div>
          <p>Moshik Place</p>
        </div>
        <div className="order-right-side align-center flex">
          <p>{orders[0].startDate.slice(0, 10)}</p>
          <p>{orders[0].totalPrice}</p>
          <div className="status-indicator align-center flex">
            <p>😎</p>
            <p>{orders[0].status}</p>
          </div>

          <select onChange={(event) => handelSelectChange(event, orders[0]._id)} name="status" id="">
            <option value="pending">Pending</option>
            <option value="approve">Approve</option>
            <option value="decline">Decline</option>
          </select>
        </div>
      </div>
    </section>
  )
}