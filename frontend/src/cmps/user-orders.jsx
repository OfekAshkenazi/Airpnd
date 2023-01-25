import { useEffect, useState } from 'react';

import { PendingIcon } from '../assets/svg/pending-icon';
import { showErrorMsg } from '../services/event-bus.service';
import { orderService } from '../services/order.service.local';

export function UserOrders() {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        onLoadOrders()
    }, [])

    async function onLoadOrders() {
        try {
            const dataOrders = await orderService.query()
            setOrders(dataOrders)
        } catch (err) {
            showErrorMsg('Cannot load orders')
        }
    }

    return (
        <section className="orders-details">
            <div className="order-list">
                {orders.map(order => {
                    return (
                        <div key={order._id} className="order-preview">
                            <div>
                                {order.stay.name}
                                <br></br>
                                New York, NY,United states Dec 30 - Jan 04
                            </div>
                            <div className="order-indiction">
                                <p className={`${order.status}`}><PendingIcon /> {order.status}</p>
                            </div>
                        </div>
                    )
                })}
                <div className="order-preview">
                    <div>
                        2 Bedroom upper east side
                        <br></br>
                        New York, NY,United states Dec 30 - Jan 04
                    </div>
                    <div className="order-indiction">
                        <p style={{ color: 'green' }}>approve</p>
                    </div>
                </div>
                <div className="order-preview">
                    <div>
                        2 Bedroom upper east side
                        <br></br>
                        New York, NY,United states Dec 30 - Jan 04
                    </div>
                    <div className="order-indiction">
                        <p style={{ color: 'red' }}>decline</p>
                    </div>
                </div>
            </div>
            <div className="order-preview-modal">
                <section className="order-display">
                    <div className="order-img">
                        <img className="order-img1" src="https://a0.muscache.com/im/pictures/f987e19d-2688-4390-a67b-e4e03c8fd592.jpg?im_w=720" alt="" />
                        <img className="order-img2" src="https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large" alt="" />
                        <img className="order-img3" src="https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg" alt="" />
                    </div>
                </section>
                <section>
                    <div>
                        2 Bedroom upper east side
                        <br></br>
                        New York, NY,United
                        <br></br>
                        Dates: states Dec 30 - Jan 04
                        <br></br>
                        Guests: 1
                        <br></br>
                        Total Price: $150
                        <br></br>
                        Order Status: pending
                    </div>
                </section>
            </div>
        </section>
    )
}