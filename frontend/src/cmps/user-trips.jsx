import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PendingIcon } from "../assets/svg/pending-icon";
import { showErrorMsg } from "../services/event-bus.service";
import { loadUser } from "../store/user.actions";

export function UserTrips() {
    const [currUser, setCurrUser] = useState(null)
    const user = useSelector(storeState => storeState.userModule.user)


    useEffect(() => {
        onLoadUser()

    })

    async function onLoadUser() {
        try {
            const realUser = await loadUser(user._id)
            setCurrUser(realUser)
        } catch (err) { showErrorMsg('Cannot load user') }
    }

    return (
        <section className="trips-details">
            <div className="trip-list">
                <div className="trip-preview">
                    <div>
                        2 Bedroom upper east side
                        <br></br>
                        New York, NY,United states Dec 30 - Jan 04
                    </div>
                    <div className="order-indiction">
                        <p style={{ color: '#ebd301' }}><PendingIcon /> pending</p>
                    </div>
                </div>
                <div className="trip-preview">
                    <div>
                        2 Bedroom upper east side
                        <br></br>
                        New York, NY,United states Dec 30 - Jan 04
                    </div>
                    <div className="order-indiction">
                        <p style={{ color: '#ebd301' }}><PendingIcon /> pending</p>
                    </div>
                </div>
                <div className="trip-preview">
                    <div>
                        2 Bedroom upper east side
                        <br></br>
                        New York, NY,United states Dec 30 - Jan 04
                    </div>
                    <div className="order-indiction">
                        <p style={{ color: 'green' }}>approve</p>
                    </div>
                </div>
                <div className="trip-preview">
                    <div>
                        2 Bedroom upper east side
                        <br></br>
                        New York, NY,United states Dec 30 - Jan 04
                    </div>
                    <div className="order-indiction">
                        <p style={{ color: 'red' }}>decline</p>
                    </div>
                </div>
            </div>
            <div className="order-preview">
                <section className="order-display">
                    <div className="order-img">
                        <img className="order-img1" src="https://a0.muscache.com/im/pictures/f987e19d-2688-4390-a67b-e4e03c8fd592.jpg?im_w=720" alt="" />
                        <img className="order-img2" src="https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large" alt="" />
                        <img className="order-img3" src="https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg" alt="" />
                    </div>
                </section>
                <section>
                    <div>
                        2 Bedroom upper east side
                        <br></br>
                        New York, NY,United
                        <br></br>
                        Dates: states Dec 30 - Jan 04
                        <br></br>
                        Guests: 1
                        <br></br>
                        Total Price: $150
                        <br></br>
                        Order Status: pending
                    </div>
                </section>
            </div>
        </section>
    )
}