import { useEffect, useState } from 'react';

import { PendingIcon } from '../assets/svg/pending-icon';
import { showErrorMsg } from '../services/event-bus.service';
import { orderService } from '../services/order.service.local';
import { PropagateLoader } from 'react-spinners';

export function UserOrders() {
    const [orders, setOrders] = useState([])
    const [currOrder, setCurrOrder] = useState(null)
    useEffect(() => {
        onLoadOrders()
    }, [])

    async function onLoadOrders() {
        try {
            const dataOrders = await orderService.query()
            setOrders(dataOrders)
            setCurrOrder(dataOrders[0])
        } catch (err) {
            showErrorMsg('Cannot load orders')
        }
    }
    console.log(currOrder)  
    if (!currOrder) return <div className="loader"><PropagateLoader color="#ff395c" /></div>
    return (
        <section className="orders-details">
            <div className="order-list">
                {orders.map(order => {
                    return (
                        <div key={order._id} onClick={() => setCurrOrder(order)} className="order-preview">
                            <div>
                                {order.stay.name}
                                <br></br>
                                {order.stay.loc.city}, {order.stay.loc.countrey} Dec 30 - Jan 04
                            </div>
                            <div className="order-indiction">
                                <p className={`${order.status}`}><PendingIcon /> {order.status}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="order-preview-modal">
                <section className="order-display">
                    <div className="order-img">
                        <img className="order-img1" src={currOrder.stay.imgUrls[0]} alt="" />
                        <img className="order-img2" src={currOrder.stay.imgUrls[1]} alt="" />
                        <img className="order-img3" src={currOrder.stay.imgUrls[2]} alt="" />
                    </div>
                </section>
                <section>
                    <div className="order-preview-details-modal">
                        <p>{currOrder.stay.name}</p>
                        <p>{currOrder.stay.loc.city}, {currOrder.stay.loc.countrey}</p>
                        <p>Dates: states Dec 30 - Jan 04</p>
                        <p>Guests: {currOrder.guests.adults}</p>
                        <p>Total price: {currOrder.totalPrice}</p>
                        <p> Order Status: {currOrder.status}</p>
                    </div>
                </section>
            </div>
        </section>
    )
}