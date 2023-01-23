import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ToggleDetails } from "../store/system.action.js"

export function ProfileNestRoutes() {

    useEffect(() => {
        document.querySelector('.icon-nav-container').style.display = 'none'
        ToggleDetails(true)
    }, [])

    return (
        <section className="user-orders">
            <div className="nav-orders-details">
                <NavLink className="btn-link" to="/orders/my-orders">My Trips</NavLink>
                <NavLink className="btn-link" to="/orders/wishlist">WishList</NavLink>
            </div>
            <div className="nested-route">
                <Outlet />
            </div>
        </section>
    )
}