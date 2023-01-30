import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ToggleDetails } from '../store/system.action.js';
import { getWishFilter } from '../services/wishList.service.js';

export function ProfileNestRoutes() {
    const user = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        ToggleDetails(true)
    }, [])

    return (
        <section className="user-orders">
            <div className="nav-orders-details">
                <NavLink className="btn-link" to={"/orders/my-orders"}>My trips</NavLink>
                <NavLink onClick={() => getWishFilter(user)} className="btn-link" to={`/orders/wishlist/${user._id}`}>Wish list</NavLink>
            </div>
            <div className="nested-route">
                <Outlet />
            </div>
        </section>
    )
}