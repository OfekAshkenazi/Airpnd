import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { showErrorMsg } from '../services/event-bus.service';
import { orderService } from '../services/order.service.local';
import { HostOrdersList } from './host-orders-list';

export function HostOrders() {
  const user = useSelector(storeState => storeState.userModule.user)
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

  async function handelSelectChange(event, orderId) {
    let { value } = event.target
    try {
      const orderToSave = await orderService.getById(orderId)
      orderToSave.status = value
      await orderService.update(orderToSave)
    } catch (err) {
      showErrorMsg('Cannot complete request')
    }

  }
  console.log(orders)
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
      <HostOrdersList handelSelectChange={handelSelectChange} orders={orders}/>
    </section>
  )
}