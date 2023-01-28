
export function HostOrderPreview({ handelSelectChange, order }) {

    return (
        <div className="order-status">
            <p className="user-img-order-container">
                <img src={order.byUser.imgUrl} alt="" />
                {order.byUser.fullname}
            </p>
            <p className="type">{order.stay.type}</p>
            <p>{order.startDate.slice(0, 10)}</p>
            <p className="price-host-order">{order.totalPrice}</p>
            <div className="status-indicator align-center flex">
                <select onChange={(event) => handelSelectChange(event, order._id)} name="status" id="">
                    <option value={order.status}>{order.status}</option>
                    <option value="approve">Approve</option>
                    <option value="decline">Decline</option>
                </select>
            </div>
           
        </div>
    )
}