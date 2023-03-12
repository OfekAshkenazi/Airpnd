import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { OrderMsg } from "../cmps/order-msg-index"
import { showErrorMsg } from "../services/event-bus.service"
import { loadOrders } from "../store/order.action"

export function OrdersMsg() {
    const orders = useSelector(storeState => storeState.orderModule.orders)

    const [roomName, setRoomName] = useState(null)
    const [currOrder, setCurrOrder] = useState(null)

    useEffect(() => {
        onLoadOrders()
    }, [])

    async function onLoadOrders() {
        try {
            await loadOrders()
        } catch (err) {
            showErrorMsg('Cannot load orders')
        }
    }

    function setInfoForMsgs(order) {
        setRoomName(order._id)
        setCurrOrder(order)
    }

    return (
        <section className="orders-msg flex">

            <section className="flex column">

                {orders.map(order => <div
                    className="order-con flex"
                    key={order._id}
                    onClick={() => setInfoForMsgs(order)}
                >
                    <img src={order.byUser.imgUrl} alt="" />
                    <p>{order.byUser.fullname}</p>
                </div>)}


            </section>


            { currOrder && <OrderMsg roomName={roomName} currOrder={currOrder} />}


        </section>
    )
}