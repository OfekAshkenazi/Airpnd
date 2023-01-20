import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ToggleDetails } from "../store/system.action.js"

export function ProfileNestRoutes() {

    useEffect(() => {
        ToggleDetails(true)
    })

    return (
        <section className="user-trips">
            <div className="nav-trips-details">
                <NavLink className="btn-link" to="/userTrips">My Trips</NavLink>
                <NavLink className="btn-link" to="/userTrips/wishlist">WishList</NavLink>
            </div>
            <div className="nested-route">
                <Outlet />
            </div>
        </section>
    )
}