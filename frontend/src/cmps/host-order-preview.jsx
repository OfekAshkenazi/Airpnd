import { utilService } from "../services/util.service";

export function HostOrderPreview({ handelSelectChange, order }) {
    return (
        <div className="order-status">
            <p className="user-img-order-container">
                <img src={order.byUser.imgUrl} alt="" />
                {utilService.shortenName(order.byUser.fullname)}
            </p>
            <p className="type mobile-gone">{order.stay.type}</p>
            <p className="date start mobile-gone">{order.startDate.slice(0, 10)}</p>
            <p className="date end mobile-gone">{order.endDate.slice(0, 10)}</p>
            <p className="price-host-order">$ {order.totalPrice}</p>
            <div className="status-indicator align-center flex">
                <button onClick={() => handelSelectChange('approved', order._id)} className={order.status === 'approve' ? 'approve active' : 'approve'} >Approve</button>
                <button onClick={() => handelSelectChange('declined', order._id)} className={order.status === 'decline' ? 'decline active' : 'decline'} >Decline</button>
            </div>
        </div>
    )
}

{/* <select onChange={(event) => handelSelectChange(event, order._id)} name="status" id="">
    <option value={order.status}>{order.status}</option>
    <option value="approve">Approve</option>
    <option value="decline">Decline</option>
</select> */}

{/* <button onClick={() => handelSelectChange('approve', order._id)} className={order.status === 'approve' ? 'approve active' : 'approve'} >Approve</button>
<button onClick={() => handelSelectChange('decline', order._id)} className={order.status === 'decline' ? 'decline active' : 'decline'} >Decline</button> */}


