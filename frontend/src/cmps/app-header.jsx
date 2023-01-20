import { faGlobe, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

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
    const [isFilterExpanded, setIsFilterExpanded] = useState(false)
    const user = useSelector(storeState => storeState.userModule.user)
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
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    const navigate = useNavigate()
    function onLogoClick() {
        navigate(`/`)
    }

    return (
        <>
            <header className="app-header">

                <div onClick={onLogoClick} className='logo-container'>
                    <img src={logo} alt="logo" className='logo' />
                    <p className='logo-title'>airpnd</p>
                </div>


                {!isFilterExpanded && <StayFilter setIsFilterExpanded={setIsFilterExpanded} isFilterExpanded={isFilterExpanded} />}
                {user &&
                    <span className="user-info">
                        <button className='btn-airpnd-your-home' >Airpnd your home</button>
                        <button className='btn-globe'><IconBxGlobe className='icon-glob' width='20px' height='20px' /></button>
                        <button className='btn-user'>
                            <IconMenu_hamburger width='30px' height='45px' className='icon-hamburger' />
                            <IconBxsUserCircle width='43px' height='43px' className='icon-user' />
                        </button>
                        {/* <span className="score">{user.score?.toLocaleString()}</span>
                    <button onClick={onLogout}>Logout</button> */}
                        {/* <Link to={`user/${user._id}`}>
                        {user.imgUrl && <img src={user.imgUrl} />}
                        {user.fullname}
                    </Link> */}
                    </span>
                }

                {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                }

                <StayFilterExpanded setIsFilterExpanded={setIsFilterExpanded} isFilterExpanded={isFilterExpanded} />
            </header>
            <hr className='hr-header' />



            <NavIconFilter />

        </>
    )

}