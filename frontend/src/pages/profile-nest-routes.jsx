import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { ToggleDetails } from '../store/system.action.js';

export function ProfileNestRoutes() {

    useEffect(() => {
        ToggleDetails(true)
    }, [])

    return (
        <section className="user-orders">
            <div className="nav-orders-details">
                <NavLink className="btn-link" to={"/orders/my-orders"}>My trips</NavLink>
                <NavLink className="btn-link" to={`/orders/wishlist/`}>Wish list</NavLink>
            </div>
            <div className="nested-route">
                <Outlet />
            </div>
        </section>
    )
}