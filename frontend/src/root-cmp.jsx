import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';

import routes from './routes';
import { AppHeader } from './cmps/app-header';
import { AppMobileFooter } from './cmps/app-mobile-footer';

import { DashBoard } from './cmps/host/dashboard-host';
import { HostOrders } from './cmps/host/host-orders';
import { LoginSignup } from './cmps/user/login-signup';
import { UserMsg } from './cmps/user/user-msg';
import { UserOrders } from './cmps/user/user-orders';
import { WishList } from './cmps/wish-list/wish-list';
import { HostProfileNested } from './pages/host-profile-nested';
import { ProfileNestRoutes } from './pages/profile-nest-routes';
import { showErrorMsg, showSuccessMsg } from './services/event-bus.service';


import { getActionFilterExpanded } from './store/filter.expanded.action';
import { ToggleLoginModal } from './store/system.action';
import { login, signup } from './store/user.actions';
import { EditStay } from './cmps/stay/edit-stay';
import { HostStayList } from './pages/host-stay-list';


export function RootCmp() {
    const isLoginModalOpen = useSelector(storeState => storeState.systemModule.isLoginModalOpen)

    const isDetailsOpen = useSelector(storeState => storeState.systemModule.isDetailsOpen)
    const layout = isDetailsOpen ? 'main-container narrow' : 'main-container'

    const { isFilterExpanded } = useSelector(storeState => storeState.filterExpandedModule)

    function closeShadowScreen() {
        if (isFilterExpanded) {
            getActionFilterExpanded(false)
          
        }
        if (isLoginModalOpen) {
            ToggleLoginModal(!isLoginModalOpen)
        }
    }

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            closeShadowScreen()
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }

    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            closeShadowScreen()
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }

    return (
        <section>
            <AppHeader layout={layout} />
            <main className={`${(isFilterExpanded) ? `${layout} shadow` : `${layout}`} ${(isLoginModalOpen) ? `${layout} shadow` : `${layout}`}`} onClick={closeShadowScreen}>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route element={<ProfileNestRoutes />} path="/orders">
                        <Route element={<WishList />} path="/orders/wishlist" />
                        <Route element={<UserOrders />} path="/orders/my-orders" />
                    </Route>
                    <Route element={<HostProfileNested />} path="/host">
                        <Route element={<HostOrders />} path="/host/orders" />
                        <Route element={<DashBoard />} path="/host/dashboard" />
                        <Route element={<HostStayList />} path="/host/stay" />
                        <Route element={<EditStay />} path="/host/edit-stay" />
                        <Route element={<EditStay />} path="/host/edit-stay/:stayId" />
                    </Route>
                </Routes>
            </main>
            {isLoginModalOpen && <LoginSignup onLogin={onLogin} onSignup={onSignup} />}
            <AppMobileFooter />
            <UserMsg />
        </section >
    )
}


