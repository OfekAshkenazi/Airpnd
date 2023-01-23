import { faGlobe, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserPagesModal } from '../cmps/user-pages-modal.jsx';

import logo from '../assets/img/logo.png';
import IconBxGlobe from '../assets/svg/globe-icon';
import IconMenu_hamburger from '../assets/svg/open-hamburger-icon';
import IconBxsUserCircle from '../assets/svg/user-icon';
import routes from '../routes';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { login, logout, signup } from '../store/user.actions.js';
import { LoginSignup } from './login-signup.jsx';
import { StayFilter } from './stay-filter';
import { StayFilterExpanded } from './stay-filter-expanded';
import { NavIconFilter } from './stay-filter-nav-icon';

export function AppHeader() {
    const { isFilterExpanded } = useSelector(storeState => storeState.filterExpandedModule)
    // const [isFilterExpanded, setIsFilterExpanded] = useState(false)
    const user = useSelector(storeState => storeState.userModule.user)
    const [userModal, setUserModal] = useState(false)



    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
    const [isWhereModalOpen, setIsWhereModalOpen] = useState(false)

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }

    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }

    const navigate = useNavigate()
    function onLogoClick() {
        navigate(`/`)
    }

    function openUserModal() {
        userModal ? setUserModal(false) : setUserModal(true)
    }


    function onAddGuest() {
        setIsGuestModalOpen(true)
    }

    function onAddWhere() {
        setIsWhereModalOpen(true)
    }
    return (
        <>
            <header className="app-header" >

                <div onClick={onLogoClick} className='logo-container'>
                    <img src={logo} alt="logo" className='logo' />
                    <p className='logo-title'>ɑirpnd</p>
                </div>

                <StayFilter onAddGuest={onAddGuest} onAddWhere={onAddWhere} />
                {user &&
                    <>
                        <span className="user-info">
                            <button className='btn-airpnd-your-home' >Airpnd your home</button>
                            {/* <button className='btn-globe'><IconBxGlobe className='icon-glob' width='20px' height='20px' /></button> */}
                            <button onClick={openUserModal} className='btn-user'>
                                <IconMenu_hamburger width='22px' height='34px' className='icon-hamburger' />
                                <IconBxsUserCircle width='37px' height='33px' className='icon-user' />
                            </button>
                            {userModal && <UserPagesModal setUserModal={setUserModal} />}
                        </span>
                    </>
                }

                {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                }
                <StayFilterExpanded isGuestModalOpen={isGuestModalOpen} isWhereModalOpen={isWhereModalOpen} onAddGuest={onAddGuest} onAddWhere={onAddWhere} />
            </header>

            <NavIconFilter />
        </>
    )
}