import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';

import { AppFooter } from './cmps/app-footer';
import { AppHeader } from './cmps/app-header';
import { HostOrders } from './cmps/host-orders';
import { UserMsg } from './cmps/user-msg';
import { UserOrders } from './cmps/user-orders';
import { WishList } from './cmps/wish-list';
import { HostProfileNested } from './pages/host-profile-nested';
import { ProfileNestRoutes } from './pages/profile-nest-routes';
import routes from './routes';
import { getActionFilterExpanded } from './store/filter.expanded.action';

export function RootCmp() {
    const isDetailsOpen = useSelector(storeState => storeState.systemModule.isDetailsOpen)
    const layout = isDetailsOpen ? 'main-container narrow' : 'main-container'
    const { isFilterExpanded } = useSelector(storeState => storeState.filterExpandedModule)

    function closeFilterExpanded() {
        if (isFilterExpanded) {
            getActionFilterExpanded(false)
        }
    }
    return (
        <section >
            <AppHeader layout={layout} />
            <div className={`${(isFilterExpanded) ? "shadow" : ""}`} onClick={closeFilterExpanded}><div ></div></div>
            <main onClick={closeFilterExpanded} className={` ${layout}`} >
                {/* {isFilterExpanded&& } */}
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route element={<ProfileNestRoutes />} path="/orders">
                        <Route element={<WishList />} path="/orders/wishlist" />
                        <Route element={<UserOrders />} path="/orders/my-orders" />
                    </Route>
                    <Route element={<HostProfileNested />} path="/host">
                        <Route element={<HostOrders />} path="/host/orders" />
                        {/* <Route element={<UserOrders />} path="/orders/my-orders" /> */}
                        {/* <Route element={<UserOrders />} path="/orders/my-orders" /> */}
                    </Route>
                </Routes>
                {/* className={`${(isFilterExpanded) ? "shadow-screen" : ""}`} */}
            </main>
            {/* <AppFooter /> */}
            <UserMsg />
        </section >
    )
}


