import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';

import { showErrorMsg } from '../services/event-bus.service';

import { stayService } from '../services/stay.service'
import { loadOrders } from '../store/order.action';

export function UserOrders() {
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const [currOrder, setCurrOrder] = useState(null)


    useEffect(() => {
        onLoadOrders()
    }, [])

    async function onLoadOrders() {
        try {
            const dataOrders = await loadOrders()
            setCurrOrder(dataOrders[0])
            console.log(dataOrders)
        } catch (err) {
            showErrorMsg('Cannot load orders')
        }
    }

    if (!currOrder) return <div className="loader"><PropagateLoader color="#ff395c" /></div>

    return (
        <section className="orders-details">
            <div className="order-list">
                {orders.map(order => {
                    return (
                        <div key={order._id} onClick={() => setCurrOrder(order)} className={`order-preview ${currOrder === order ? 'selected-order' : ''}`}>

                            <div className="preview-txt">
                                <span className="preview-name">{order.stay.name}</span>
                                <span className="preview-loc"> {order.stay.loc.city}, {order.stay.loc.countrey} Dec 30 - Jan 04</span>
                            </div>
                            <div className="order-indiction">
                                <p className={`${order.status}`}>{order.status}</p>
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
                        <div className="preview-bold">{currOrder.stay.name}</div>
                        <div className="preview-bold">{currOrder.stay.loc.city}, {currOrder.stay.loc.countrey}</div>
                        <div className="preview-bold">Dates:{' '}
                            <span className="regular">
                                {(stayService.extractDate(currOrder.startDate))} - {(stayService.extractDate(currOrder.endDate))}
                            </span></div>
                        <div className="preview-bold">Guests:
                            <span className="preview-regular"> {currOrder.guests.adults + currOrder.guests.children + currOrder.guests.infants + currOrder.guests.pets} </span></div>
                        <div className="preview-bold">Total price: <span className="regular"> {currOrder.totalPrice}</span></div>
                        <div className="preview-bold">Order Status: <span className="regular"> {currOrder.status}</span></div>
                    </div>
                </section>
            </div>
        </section>

    )
}