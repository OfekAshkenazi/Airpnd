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
                        <PendingIcon /> pending
                    </div>
                </div>
            </div>
            <div className="order-preview">
                <div className="img-grid"></div>
            </div>
        </section>
    )
}