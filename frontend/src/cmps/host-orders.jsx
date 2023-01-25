import { useEffect, useState } from 'react';

import { showErrorMsg } from '../services/event-bus.service';
import { orderService } from '../services/order.service.local';

export function HostOrders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    onLoadOrders()
  })

  async function onLoadOrders() {
    try {
      const hostOrders = await orderService.query()
    } catch (err) {
      console.log(err)
      showErrorMsg('Cannot load orders')
    }
  }

  return (
    <section className='host-orders'>

    </section>
  )
}