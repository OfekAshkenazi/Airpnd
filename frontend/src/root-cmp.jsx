import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';

import { AppFooter } from './cmps/app-footer';
import { AppHeader } from './cmps/app-header';
import { AppMobileFooter } from './cmps/app-mobile-footer';
import { DashBoard } from './cmps/dashboard-host1';
import { HostOrders } from './cmps/host-orders';
import { LoginSignup } from './cmps/login-signup';
import { UserMsg } from './cmps/user-msg';
import { UserOrders } from './cmps/user-orders';
import { WishList } from './cmps/wish-list';
import { HostProfileNested } from './pages/host-profile-nested';
import { ProfileNestRoutes } from './pages/profile-nest-routes';
import routes from './routes';
import { showErrorMsg, showSuccessMsg } from './services/event-bus.service';
import { getActionFilterExpanded } from './store/filter.expanded.action';
import { ToggleLoginModal } from './store/system.action';
import { login, signup } from './store/user.actions';

export function RootCmp() {
    const isDetailsOpen = useSelector(storeState => storeState.systemModule.isDetailsOpen)

    const isLoginModalOpen = useSelector(storeState => storeState.systemModule.isLoginModalOpen)

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
        <section >
            <AppHeader layout={layout} />
            <div className={`${(isFilterExpanded) ? "shadow" : ""} ${(isLoginModalOpen) ? "shadow" : ""}`} onClick={closeShadowScreen}><div ></div></div>
            <main className={` ${layout}`} >
                {/* {isFilterExpanded&& } */}
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route element={<ProfileNestRoutes />} path="/orders">
                        <Route element={<WishList />} path="/orders/wishlist" />
                        <Route element={<UserOrders />} path="/orders/my-orders" />
                    </Route>
                    <Route element={<HostProfileNested />} path="/host">
                        <Route element={<HostOrders />} path="/host/orders" />
                        <Route element={<DashBoard />} path="/host/dashboard" />
                        {/* <Route element={<EditStay />} path="/host/edit-stay" /> */}
                    </Route>
                </Routes>
                {/* className={`${(isFilterExpanded) ? "shadow-screen" : ""}`} */}
            </main>
            {/* <AppFooter /> */}
            {isLoginModalOpen && <LoginSignup onLogin={onLogin} onSignup={onSignup} />}
            <AppMobileFooter />
            <UserMsg />
        </section >
    )
}


