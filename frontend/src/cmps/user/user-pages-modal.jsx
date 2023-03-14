import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { showErrorMsg } from '../../services/event-bus.service.js';
import { getHostOrderFilter } from '../../services/wishList.service.js';
import { ToggleLoginModal } from '../../store/system.action.js';
import { logout } from '../../store/user.actions.js';

export function UserPagesModal({ setUserModal, setNumberOfNotification }) {
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

    function handleLogin() {
        user ? onLogout() : ToggleLoginModal(!isLoginModalOpen)
        setUserModal(false)
    }

    function handleMsgClick() {
        setUserModal(false)
        navigate('/orders/msgs')
    }
    
    return (
        <section className="user-page-modal">
            <section className="bold">
                {user && <div onClick={handleMsgClick} className="page-item flex bold space-bet w100 align-center">Messages <span className='notification user-page'>{setNumberOfNotification()}</span></div>}
                <div onClick={() => handleClickTrips(user)} className="page-item flex bold">Trips</div>
                {user?.isOwner && <Link to="/host/dashboard"><div onClick={handleClickHostDashBoard} className="page-item flex bold">Host</div></Link>}
                <Link to="/orders/wishlist"><div onClick={() => setUserModal(false)} className="page-item flex bold">Wishlist</div></Link>
            </section>
            <hr />
            <section className="grey">
                <div onClick={handleLogin} className="page-item flex grey">{user ? 'Log out' : 'Log in'}</div>
            </section>
        </section>
    )
}