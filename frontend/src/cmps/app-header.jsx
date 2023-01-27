import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/img/logo.png';
import IconMenu_hamburger from '../assets/svg/open-hamburger-icon';
import { UserPagesModal } from '../cmps/user-pages-modal.jsx';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { stayService } from '../services/stay.service';
import { onSetFilter } from '../store/stay.actions';
import { login, signup } from '../store/user.actions.js';
import { LoginSignup } from './login-signup.jsx';
import { StayFilter } from './stay-filter';
import { StayFilterExpanded } from './stay-filter-expanded';
import { NavIconFilter } from './stay-filter-nav-icon';
import { StayFilterPlaceTaker } from './stay-filter-place-taker';

export function AppHeader({ layout }) {
    const { isFilterExpanded } = useSelector(storeState => storeState.filterExpandedModule)
    // const [isFilterExpanded, setIsFilterExpanded] = useState(false)
    const user = useSelector(storeState => storeState.userModule.user)
    const [userModal, setUserModal] = useState(false)



    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
    const [isWhereModalOpen, setIsWhereModalOpen] = useState(false)
    const [isDateModalOpen, setIsDateModalOpen] = useState(false)

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
        onSetFilter(stayService.getEmptyFilter())
    }

    function openUserModal() {
        userModal ? setUserModal(false) : setUserModal(true)
    }


    function onAddGuest() {
        // ev.stopPropagation()

        setIsGuestModalOpen(true)
        setIsWhereModalOpen(false)
        setIsDateModalOpen(false)
    }

    function onAddWhere() {
        setIsWhereModalOpen(true)
        setIsGuestModalOpen(false)
        setIsDateModalOpen(false)
    }
    function onDateModal() {
        setIsDateModalOpen(true)
        setIsWhereModalOpen(false)
        setIsGuestModalOpen(false)
    }

    // function onHeader() {
    //     setIsWhereModalOpen(true)
    //     setIsGuestModalOpen(true)
    // }


    return (
        <>
            <header className={`full header ${(isFilterExpanded) ? "expanded" : ""} ${(layout === 'main-container narrow') ? "narrow" : ""}`} >

                <section className={`app-header ${layout}`} >
                    <div className='first-row-header' >
                        <div onClick={onLogoClick} className='logo-container'>
                            <img src={logo} alt="logo" className='logo' />
                            <p className='logo-title'>airpnd</p>
                        </div>

                        {!isFilterExpanded && <StayFilter onAddGuest={onAddGuest} onAddWhere={onAddWhere} onDateModal={onDateModal} />}
                        {isFilterExpanded && <StayFilterPlaceTaker />}

                        <span className="user-info">
                            <button className='btn-airpnd-your-home' >Airpnd your home</button>
                            <button onClick={openUserModal} className='btn-user'>
                                <IconMenu_hamburger width='22px' height='33px' className='icon-hamburger' />
                                <img src={user ? user.imgUrl : require(`../assets/user-img/japanese.jpg`)} alt="" />                            </button>
                            {userModal && <UserPagesModal setUserModal={setUserModal} />}
                        </span>

                        <StayFilterExpanded isGuestModalOpen={isGuestModalOpen} isWhereModalOpen={isWhereModalOpen} isDateModalOpen={isDateModalOpen} onAddGuest={onAddGuest} onAddWhere={onAddWhere} onDateModal={onDateModal} />
                    </div>

                    {!isFilterExpanded && <div className='full hr-header'>
                        <hr />
                    </div>}

                    <div className='second-row-header'>
                        <NavIconFilter />
                    </div>

                </section>
            </header>

        </ >
    )
}