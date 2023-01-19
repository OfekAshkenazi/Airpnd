import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { login, signup } from '../store/user.actions';

export function AppFooter() {
  // const user = useSelector(storeState => storeState.userModule.user)
  // async function onLogin(credentials) {
  //     try {
  //         const user = await login(credentials)
  //         showSuccessMsg(`Welcome: ${user.fullname}`)
  //     } catch (err) {
  //         showErrorMsg('Cannot login')
  //     }
  // }
  // async function onSignup(credentials) {
  //     try {
  //         const user = await signup(credentials)
  //         showSuccessMsg(`Welcome new user: ${user.fullname}`)
  //     } catch (err) {
  //         showErrorMsg('Cannot signup')
  //     }
  // }
  // async function onLogout() {
  //     try {
  //         await logout()
  //         showSuccessMsg(`Bye now`)
  //     } catch (err) {
  //         showErrorMsg('Cannot logout')
  //     }
  // }
  // return (
  //     <footer className="app-footer">
  //         <span className="score">{user.score?.toLocaleString()}</span>
  //         <button onClick={onLogout}>Logout</button>
  //         <Link to={`user/${user._id}`}>
  //             {user.imgUrl && <img src={user.imgUrl} />}
  //             {user.fullname}
  //         </Link>
  //     </footer>
  // )
}