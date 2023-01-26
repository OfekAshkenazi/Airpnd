export function HostOrderPreview({ handelSelectChange, order }) {
    return (
        <div className="order-status align-center flex">
            <div className="orders-left-side align-center flex">
                <div className="flex align-center">
                    <div className="user-img-order-container">
                        <img src={order.byUser.imgUrl} alt="" />
                    </div>
                    <p>{order.byUser.fullname}</p>
                </div>
                <p>{order.stay.name}</p>
            </div>
            <div className="order-right-side align-center flex">
                <p>{order.startDate.slice(0, 10)}</p>
                <p>{order.totalPrice}</p>
                <div className="status-indicator align-center flex">
                    <p>😎</p>
                    <p>{order.status}</p>
                </div>

                <select onChange={(event) => handelSelectChange(event, order._id)} name="status" id="">
                    <option value={order.status}>{order.status}</option>
                    <option value="approve">Approve</option>
                    <option value="decline">Decline</option>
                </select>
            </div>
        </div>
    )
}