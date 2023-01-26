import { faAirbnb } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getWishFilter } from "../services/wishList.service";
import IconCircleHost from "./svg-cmps/host-profile-icon";
import IconHeartFooter from "./svg-cmps/icon-heart-footer";
import IconSearch from "./svg-cmps/search-footer-icon";

export function AppMobileFooter() {
    const user = useSelector(storeState => storeState.userModule.user)

    return (
        <div className="app-mobile-footer flex">

            <NavLink className={"icon-mobile-footer flex column"} to="/">
                <IconSearch />
                <p>Explore</p>
            </NavLink>

            <NavLink className={"icon-mobile-footer flex column"} to="/orders/wishlist" onClick={() => getWishFilter(user)}>
                <FontAwesomeIcon  className="icon-airpnd-footer" icon={faHeartbeat} />
                <p>Wishlists</p>
            </NavLink>

            <NavLink className={"icon-mobile-footer flex column"} to="/orders/my-orders">
                <FontAwesomeIcon className="icon-airpnd-footer" icon={faAirbnb} />
                <p>Trips</p>
            </NavLink>

            <NavLink className={"icon-mobile-footer flex column"} to="/host/orders">
                <IconCircleHost />
                <p>Host</p>
            </NavLink>

        </div>
    )
}