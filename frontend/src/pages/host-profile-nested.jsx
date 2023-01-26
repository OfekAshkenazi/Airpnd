import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { ToggleDetails } from '../store/system.action.js';


export function HostProfileNested() {

  useEffect(() => {
    ToggleDetails(true)
  }, [])

  return (
    <section className="host-dashboard">
      <div className="nav-orders-details">
        <NavLink className="btn-link" to="/host/dashboard">Dashboard</NavLink>
        <NavLink className="btn-link" to="/host/orders">Orders</NavLink>
        <NavLink className="btn-link" to="/host/stays">My Stays</NavLink>
        <NavLink className="btn-link" to="/host/add-stay">Add a stay</NavLink>
      </div>
      <div className="nested-route">
        <Outlet />
      </div>
    </section>
  )
}



