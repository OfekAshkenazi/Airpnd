import { HostOrderPreview } from "./host-order-preview"

export function HostOrdersList({ handelSelectChange, orders }) {
    return (
        <ul className="host-orders-list">
            {orders.map(order => <li key={order._id}>
                <HostOrderPreview order={order} handelSelectChange={handelSelectChange} />
            </li> )}
        </ul>
    )
}