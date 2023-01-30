import { useEffect } from "react"
import { useSelector } from "react-redux"
import { showErrorMsg } from "../services/event-bus.service"
import { loadOrders } from "../store/order.action"

export function ResStatus() {
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

    function countPendingOrders(orders, status) {
        return orders.filter(order => order.status === status).length
    }
    return <section className="res-status-box">
        <h2> Reservations status </h2>
        <div className="curr-status">
            <div className="status-line">Pending<span className="status-name pending">
                {countPendingOrders(orders, 'pending')}</span></div>
            <div className="status-line">Approved<span className="status-name approved">
                {countPendingOrders(orders, 'approved')}</span></div>
            <div className="status-line">Rejected<span className="status-name decline">
                {countPendingOrders(orders, 'decline')}</span></div>
        </div>

    </section>
}