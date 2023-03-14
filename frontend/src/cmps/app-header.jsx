import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/img/logo.png';
import IconMenu_hamburger from '../assets/svg/open-hamburger-icon';
import { UserPagesModal } from '../cmps/user/user-pages-modal.jsx';
import { showErrorMsg } from '../services/event-bus.service';
import { socketService } from '../services/socket.service';
import { stayService } from '../services/stay.service';
import { loadOrders } from '../store/order.action';
import { onSetFilter } from '../store/stay/stay.actions';
import { StayFilter } from './filter/stay-filter';
import { StayFilterExpanded } from './filter/stay-filter-expanded';
import { NavIconFilter } from './filter/stay-filter-nav-icon';
import { StayFilterPlaceTaker } from './filter/stay-filter-place-taker';

export function AppHeader({ layout }) {
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const { isFilterExpanded } = useSelector(storeState => storeState.filterExpandedModule)
    const user = useSelector(storeState => storeState.userModule.user)


    const [userModal, setUserModal] = useState(false)
    const [whoCounter, setWhoCounter] = useState(0)

    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
    const [isWhereModalOpen, setIsWhereModalOpen] = useState(false)
    const [isDateModalOpen, setIsDateModalOpen] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        socketService.on('socket-event-add-notification', (data) => {
            console.log(data)
        })
        return () => {
            socketService.off('socket-event-add-notification', (data) => {
                
            })
        }
    }, [])


    useEffect(() => {
        if (user) {
            onLoadOrders()
        }
    }, [])

    async function onLoadOrders() {
        try {
            await loadOrders()
        } catch (err) {
            showErrorMsg('Cannot load orders')
        }
    }

    function setNumberOfNotification() {
        let counter = 0
        for (const order of orders) {
            counter += order.msgs.reduce((acc, msg) => {
                if (!msg.msgRead) acc++
                return acc
            }, 0)
        }
        return counter
    }


    function onLogoClick() {
        navigate(`/`)
        onSetFilter(stayService.getEmptyFilter())
    }

    function openUserModal() {
        userModal ? setUserModal(false) : setUserModal(true)
    }

    function onAddGuest() {
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


    return (
        <>
            <header className={`full header ${(isFilterExpanded) ? "expanded" : ""} ${(layout === 'main-container narrow') ? "narrow" : ""}`} >

                <section className={`app-header ${layout}`} >
                    <div className='first-row-header' >
                        <div onClick={onLogoClick} className='logo-container'>
                            <img src={logo} alt="logo" className='logo' />
                            <p className='logo-title'>airpnd</p>
                        </div>

                        {!isFilterExpanded && <StayFilter onAddGuest={onAddGuest} onAddWhere={onAddWhere} onDateModal={onDateModal} whoCounter={whoCounter} />}
                        {isFilterExpanded && <StayFilterPlaceTaker />}

                        <div className="user-info">
                            <button className='btn-airpnd-your-home' >Airpnd your home</button>
                            <button onClick={openUserModal} className='btn-user'>
                                <IconMenu_hamburger width='22px' height='33px' className='icon-hamburger' />
                                <img src={user ? user.imgUrl : require(`../assets/user-img/japanese.jpg`)} alt="" /></button>
                            {userModal && <UserPagesModal setUserModal={setUserModal} />}
                            {user && <div className="notification">
                                {setNumberOfNotification()}
                            </div>}
                        </div>

                        <StayFilterExpanded isGuestModalOpen={isGuestModalOpen} isWhereModalOpen={isWhereModalOpen} isDateModalOpen={isDateModalOpen} onAddGuest={onAddGuest} onAddWhere={onAddWhere} onDateModal={onDateModal} whoCounter={whoCounter} setWhoCounter={setWhoCounter} />
                    </div>

                    {!isFilterExpanded && <div className='full hr-header'>
                        <hr />
                    </div>}


                </section>
                {!isFilterExpanded && <NavIconFilter layout={layout} />}
            </header>

        </ >
    )
}