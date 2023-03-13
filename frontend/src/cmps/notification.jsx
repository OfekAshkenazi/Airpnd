import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { showErrorMsg } from "../services/event-bus.service";
import { loadOrders } from "../store/order.action";

export function Notification() {
    const orders = useSelector(storeState => storeState.orderModule.orders)

    let counter = useRef(0)

    useEffect(() => {
        onLoadOrders()
        setNumberOfNotification()
    }, [])

    async function onLoadOrders() {
        try {
            await loadOrders()
        } catch (err) {
            showErrorMsg('Cannot load orders')
        }
    }

    function setNumberOfNotification() {

        orders.msgs.forEach(msg => {
            msg.msgRead ? counter.current++ : counter.current = counter.current
        })
    }

    return (
        <div className="notification">
            {counter}
        </div>
    )
}