import { Link } from "react-router-dom";
import { showErrorMsg } from "../services/event-bus.service.js";

import { logout } from '../store/user.actions.js';
export function UserPagesModal({ setUserModal }) {


    async function onLogout() {
        try {
            await logout()
            closeModal()
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function closeModal() {
        setUserModal(false)
    }
    
    return (
        <section className="user-page-modal">
            <section className="bold">
                <div onClick={closeModal} className="page-item flex bold"><Link>Messages</Link></div>
                <div onClick={closeModal} className="page-item flex bold"><Link>Notifications</Link></div>
                <div onClick={closeModal} className="page-item flex bold"><Link to="/orders">Trips</Link></div>
                <div onClick={closeModal} className="page-item flex bold"><Link>Wishlist</Link></div>
            </section>
            <hr />
            <section className="grey">
                <div onClick={closeModal} className="page-item flex grey"><Link>Airpnd your home</Link></div>
                <div onClick={closeModal} className="page-item flex grey"><Link>Host an experience</Link></div>
                <div onClick={closeModal} className="page-item flex grey"><Link>Refer a host</Link></div>
                <div onClick={closeModal} className="page-item flex grey"><Link>Account</Link></div>
            </section>
            <hr />
            <section className="grey">
                <div onClick={closeModal} className="page-item flex grey"><Link>Help</Link></div>
                <div onClick={onLogout} className="page-item flex grey">Log out</div>
            </section>
        </section>
    )
}