import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';

import { showErrorMsg } from '../services/event-bus.service';
import { orderService } from '../services/order.service.local';
import { loadOrders, updateOrderStatus } from '../store/order.action';
import { HostOrdersList } from './host-orders-list';


export function HostOrders() {
  const user = useSelector(storeState => storeState.userModule.user)
  const orders = useSelector(storeState => storeState.orderModule.orders)

  useEffect(() => {
    onLoadOrders()
  }, [])

  async function onLoadOrders() {
    try {
      await loadOrders()
    } catch (err) {
      console.log(err)
      showErrorMsg('Cannot load orders')
    }
  }

  async function handelSelectChange(txt, orderId) {
    try {
      const orderToSave = await orderService.getById(orderId)
      orderToSave.status = txt
      await updateOrderStatus(orderToSave)
    } catch (err) {
      showErrorMsg('Cannot complete request')
    }

  }

  if (!orders.length) return <div className="loader"><PropagateLoader color="#ff395c" /></div>

  return (
    <section className='host-orders'>
      <div className="host-orders-headline flex">
        <p>Client</p>
        <p className="mobile-gone">Property type</p>
        <p className="mobile-gone">Start date</p>
        <p className="mobile-gone">End date</p>
        <p>Price</p>
        <p>Status</p>
      </div>
      <HostOrdersList handelSelectChange={handelSelectChange} orders={orders} />
    </section>
  )
}
