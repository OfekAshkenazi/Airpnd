import React from 'react'
import { Routes, Route } from 'react-router'
import { useSelector } from 'react-redux';
import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserMsg } from './cmps/user-msg'

import { ToggleDetails } from "./store/system.action.js"
import { ProfileNestRoutes } from './pages/profile-nest-routes';
import { WishList } from './cmps/wish-list';
import { UserTrips } from './cmps/user-trips';

export function RootCmp() {
    const isDetailsOpen = useSelector(storeState => storeState.systemModule.isDetailsOpen)
    const layout = isDetailsOpen ? 'main-container narrow' : 'main-container'
    return (
        <section className={layout}>
            <AppHeader />
            <main>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route element={<ProfileNestRoutes />} path="/userTrips">
                        <Route element={<WishList />} path="/userTrips/wishlist" />
                        <Route element={<UserTrips />} path="/userTrips" />
                    </Route>
                </Routes>

            </main>
            <AppFooter />
            <UserMsg />
        </section>
    )
}


