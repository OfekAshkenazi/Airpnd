import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { getHostOrderFilter, getWishFilter } from '../services/wishList.service.js';
import { onSetFilter } from '../store/stay.actions.js';
import { ToggleLoginModal } from '../store/system.action.js';
import { logout } from '../store/user.actions.js';
import { stayService } from '../services/stay.service.js';

export function UserPagesModal({ setUserModal }) {
    const user = useSelector(storeState => storeState.userModule.user)
    const isLoginModalOpen = useSelector(storeState => storeState.systemModule.isLoginModalOpen)
    const navigate = useNavigate()

    async function onLogout() {
        try {
            await logout()
            setUserModal(false)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function handleClickTrips(user) {
        if (!user) {
            setUserModal(false)
            return showErrorMsg('Please login')
        }
        setUserModal(false)
        navigate('/orders/my-orders')
    }

    function handleClickHostDashBoard() {
        getHostOrderFilter(user)
        setUserModal(false)
    }

    function handleClickLogin() {
        ToggleLoginModal(!isLoginModalOpen)
        setUserModal(false)
    }

    return (
        <section className="user-page-modal">
            <section className="bold">
                <div onClick={() => setUserModal(false)} className="page-item flex bold"><Link to="/orders/msgs">Messages</Link></div>
                <div onClick={() => handleClickTrips(user)} className="page-item flex bold">Trips</div>
                {user?.isOwner && <Link to="/host/dashboard"><div onClick={handleClickHostDashBoard} className="page-item flex bold">Host</div></Link>}
                <Link to="/orders/wishlist"><div onClick={() => setUserModal(false)} className="page-item flex bold">Wishlist</div></Link>
                <Link><div onClick={handleClickLogin} className="page-item flex bold">Account</div></Link>
            </section>
            <hr />
            {/* <section className="grey"> */}
            {/* <div onClick={closeModal} className="page-item flex grey"><Link>Airpnd your home</Link></div> */}
            {/* <div onClick={closeModal} className="page-item flex grey"><Link>Host an experience</Link></div> */}
            {/* <div onClick={closeModal} className="page-item flex grey"><Link>Refer a host</Link></div> */}
            {/* </section> */}
            {/* <hr /> */}
            <section className="grey">
                {/* <div onClick={closeModal} className="page-item flex grey"><Link>Help</Link></div> */}
                <div onClick={onLogout} className="page-item flex grey">Log out</div>
            </section>
        </section>
    )
}