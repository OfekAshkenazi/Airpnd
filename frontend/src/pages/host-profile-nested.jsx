import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

import { getHostOrderFilter } from '../services/wishList.service.js';
import { ToggleDetails } from '../store/system.action.js';


export function HostProfileNested() {
  const user = useSelector(storeState => storeState.userModule.user)


  useEffect(() => {
    ToggleDetails(true)
  }, [])


  return (
    <section className="host-dashboard">
      <div className="nav-orders-details-host">
        <NavLink onClick={() => getHostOrderFilter(user)} className="btn-link-host" to="/host/dashboard">Dashboard</NavLink>
        <NavLink className="btn-link-host" to="/host/orders">Orders</NavLink>
        <NavLink className="btn-link-host" to="/host/stay">Stays</NavLink>
        <NavLink className="btn-link-host" to="/host/edit-stay">Add a stay</NavLink>
      </div>
      <div className="nested-route">
        <Outlet />
      </div>
    </section>
  )
}



// move function 