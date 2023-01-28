import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { getHostOrderFilter, getWishFilter } from '../services/wishList.service.js';
import { ToggleLoginModal } from '../store/system.action.js';
import { logout } from '../store/user.actions.js';

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

    function handleClickHostDashBoard() {
        getHostOrderFilter(user)
        setUserModal(false)
    }

    function handleClickLogin() {
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
                <Link to="/orders/my-orders"><div onClick={() => setUserModal(false)} className="page-item flex bold">Trips</div></Link>
                <Link to="/host/dashboard"><div onClick={handleClickHostDashBoard} className="page-item flex bold">Host</div></Link>
                <Link to="/orders/wishlist"><div onClick={setUserWishes} className="page-item flex bold">Wishlist</div></Link>
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