import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { getWishFilter } from '../services/wishList.service.js';
import { logout } from '../store/user.actions.js';
import { login, signup } from '../store/user.actions';
import { LoginSignup } from '../cmps/login-signup.jsx';
import { useState } from 'react';
import { ToggleLoginModal } from '../store/system.action.js';

export function UserPagesModal({ setUserModal }) {
    const user = useSelector(storeState => storeState.userModule.user)
    const isLoginModalOpen = useSelector(storeState => storeState.systemModule.isLoginModalOpen)


    async function onLogout() {
        try {
            await logout()
            setUserModal(false)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function handleClickHost() {
        ToggleLoginModal(!isLoginModalOpen)
        setUserModal(false)
    }

    function setUserWishes() {
        getWishFilter(user)
        setUserModal(false)
    }

    return (
        <section className="user-page-modal">
            <section className="bold">
                {/* <div onClick={closeModal} className="page-item flex bold"><Link>Messages</Link></div> */}
                {/* <div onClick={closeModal} className="page-item flex bold"><Link>Notifications</Link></div> */}
                <div onClick={() => setUserModal(false)} className="page-item flex bold"><Link to="/orders/my-orders">Trips</Link></div>
                <div onClick={() => setUserModal(false)} className="page-item flex bold"><Link to="/host/dashboard">Host</Link></div>
                <div onClick={setUserWishes} className="page-item flex bold"><Link to="/orders/wishlist">Wishlist</Link></div>
                <div onClick={handleClickHost} className="page-item flex bold"><Link>Account</Link></div>
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