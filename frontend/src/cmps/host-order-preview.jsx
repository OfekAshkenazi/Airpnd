import SimpleSelect from './host-select-order';

export function HostOrderPreview({ handelSelectChange, order }) {

    function shortenName(name) {
        var parts = name.split(" ")
        var firstName = parts[0]
        var lastInitial = parts[parts.length - 1][0]
        return firstName + " " + lastInitial + "."
    }


    return (
        <div className="order-status">
            <p className="user-img-order-container">
                <img src={order.byUser.imgUrl} alt="" />
                {shortenName(order.byUser.fullname)}
            </p>
            <p className="type mobile-gone">{order.stay.type}</p>
            <p className="mobile-gone">{order.startDate.slice(0, 10)}</p>
            <p className="price-host-order">$ {order.totalPrice}</p>
            <div className="status-indicator align-center flex column">
                <select onChange={(event) => handelSelectChange(event, order._id)} name="status" id="">
                    <option value={order.status}>{order.status}</option>
                    <option value="approve">Approve</option>
                    <option value="decline">Decline</option>
                </select>
            </div>
        </div>
    )
}

{/* <button onClick={() => handelSelectChange('approve', order._id)} className={order.status === 'approve' ? 'approve active' : 'approve'} >Approve</button>
<button onClick={() => handelSelectChange('decline', order._id)} className={order.status === 'decline' ? 'decline active' : 'decline'} >Decline</button> */}


