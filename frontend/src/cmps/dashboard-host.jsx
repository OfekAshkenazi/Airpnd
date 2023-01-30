import { GoogleMapHostStays } from './google-map-host-stays.jsx';
import { HostStayList } from './host-stay-list.jsx';
import { TaxReport } from './tax-report.jsx';
import { ResStatus } from './res-status.jsx';
import { TotalEarn } from './total-earn';
import { TotalExpenses } from './total-expenses.jsx';

export function DashBoard() {
    return (
        <section className="dashboard-page">
            <section className="charts-container">

                <div className="tax-report">
                    <TaxReport />
                </div>
                <div className="res-status">
                    <ResStatus />
                </div>
                <div className="chart-container total-earn">
                    <TotalEarn />
                </div>
            </section>
            {/* <GoogleMapHostStays /> */}
            
            <HostStayList />

        </section>
    )
}