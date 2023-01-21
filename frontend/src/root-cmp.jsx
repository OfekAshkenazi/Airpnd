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
import { UserOrders } from './cmps/user-orders';

export function RootCmp() {
    const isDetailsOpen = useSelector(storeState => storeState.systemModule.isDetailsOpen)
    const layout = isDetailsOpen ? 'main-container narrow' : 'main-container'
    return (
        <section className={layout}>
            <AppHeader />
            <main>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route element={<ProfileNestRoutes />} path="/orders">
                        <Route element={<WishList />} path="/orders/wishlist" />
                        <Route element={<UserOrders />} path="/orders" />
                    </Route>
                </Routes>

            </main>
            <AppFooter />
            <UserMsg />
        </section>
    )
}


