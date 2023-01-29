import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { faAirbnb } from "@fortawesome/free-brands-svg-icons";
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getWishFilter } from "../services/wishList.service";
import IconCircleHost from "./svg-cmps/host-profile-icon";
import IconSearch from "./svg-cmps/search-footer-icon";

import { ToggleLoginModal } from '../store/system.action.js';
import IconLoginVariant from "./svg-cmps/login-icon";
import IconLogout from "./svg-cmps/logout-icon";
import IconLogin from "./svg-cmps/login-icon";
import { logout } from "../store/user.actions";
import { showErrorMsg } from "../services/event-bus.service";

export function AppMobileFooter() {
    const user = useSelector(storeState => storeState.userModule.user)
    const isLoginModalOpen = useSelector(storeState => storeState.systemModule.isLoginModalOpen)

    function handleClickLogin() {
        ToggleLoginModal(!isLoginModalOpen)
    }


    async function onLogout() {
        try {
            await logout()
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }


    return (
        <div className="app-mobile-footer flex">

            <NavLink className={"icon-mobile-footer flex column"} to="/">
                <IconSearch />
                <p>Explore</p>
            </NavLink>

            <NavLink className={"icon-mobile-footer flex column"} to="/orders/wishlist" onClick={() => getWishFilter(user)}>
                <FontAwesomeIcon className="icon-airpnd-footer" icon={faHeartbeat} />
                <p>Wishlists</p>
            </NavLink>

            <NavLink className={"icon-mobile-footer flex column"} to="/orders/my-orders">
                <FontAwesomeIcon className="icon-airpnd-footer" icon={faAirbnb} />
                <p>Trips</p>
            </NavLink>

            {!user && <p onClick={handleClickLogin} className={"icon-mobile-footer flex column"} >
                <IconLoginVariant />
                <span className="login-footer">Login</span>
            </p>}

            {user && <p onClick={onLogout} className={"icon-mobile-footer flex column"} >
                <IconLogout />
                <span className="login-footer">Logout</span>
            </p>}

            {user?.isOwner && <NavLink className={"icon-mobile-footer flex column"} to="/host/orders">
                <IconCircleHost />
                <p>Host</p>
            </NavLink>}

        </div>
    )
}