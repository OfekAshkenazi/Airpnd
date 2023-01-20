import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showErrorMsg } from "../services/event-bus.service";
import { loadUser } from "../store/user.actions";

export function MyTrips() {
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
        <section>
            hi
        </section>
    )
}