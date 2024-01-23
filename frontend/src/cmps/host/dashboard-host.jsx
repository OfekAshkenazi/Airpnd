import { HostStayList } from './host-stay-list.jsx';
import { TaxReport } from '../host/tax-report.jsx';
import { ResStatus } from '../res-status.jsx';
import { TotalEarn } from '../host/total-earn';
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { loadOrders } from "../../store/order.action"
import { showErrorMsg } from '../../services/event-bus.service.js';


export function DashBoard() {
    const orders = useSelector(storeState => storeState.orderModule.orders)
    useEffect(() => {
        onLoadOrders()

    }, [])

    async function onLoadOrders() {
        try {
            await loadOrders()
        } catch (err) {
            console.log(err)
            showErrorMsg('Cannot load orders')
        }
    }

  

    return (
        <section className="dashboard-page">
            <section className="charts-container">

                <div className="res-status">
                    <ResStatus orders={orders} />
                </div>
                <div className="tax-report">
                    <TaxReport />
                </div>
                <div className="chart-container total-earn">
                    <TotalEarn orders={orders} />
                </div>
            </section>
            {/* <GoogleMapHostStays /> */}

            <HostStayList />

        </section>
    )
}