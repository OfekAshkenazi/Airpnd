import { faGlobe, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import logo from '../assets/img/logo.png';
import routes from '../routes';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { login, logout, signup } from '../store/user.actions.js';
import { LoginSignup } from './login-signup.jsx';
import { StayFilter } from './stay-filter';

export function AppHeader() {
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
        <header className="app-header">
            <div onClick={onLogoClick} className='logo-container'>
                <img src={logo} alt="logo" className='logo' />
                <p className='logo-title'>airpnd</p>
            </div>

            <StayFilter />

            {user &&
                <span className="user-info">
                    <button className='airpnd-your-home' >airpnd your home</button>
                    <button className='btn-globe'><FontAwesomeIcon icon={faGlobe} className='icon-globe' /></button>
                    <button className='btn-user'><FontAwesomeIcon icon={faUser} className='icon-user' /></button>
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

        </header>
    )

}