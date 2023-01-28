import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { showErrorMsg } from '../services/event-bus.service';
import { orderService } from '../services/order.service.local';
import { HostOrdersList } from './host-orders-list';
import { PropagateLoader } from 'react-spinners';

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
  if (!orders.length) return <div className="loader"><PropagateLoader color="#ff395c" /></div>

  return (
    <section className='host-orders'>
      <div className="host-orders-headline flex">
        <p>Client</p>
        <p>Property type</p>
        <p>Date</p>
        <p>Price</p>
        <p>Status</p>
      </div>
      <HostOrdersList handelSelectChange={handelSelectChange} orders={orders}/>
    </section>
  )
}