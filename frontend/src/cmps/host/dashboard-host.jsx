import { HostStayList } from './host-stay-list.jsx';
import { TaxReport } from '../host/tax-report.jsx';
import { ResStatus } from '../res-status.jsx';
import { TotalEarn } from '../host/total-earn';

export function DashBoard() {
    return (
        <section className="dashboard-page">
            <section className="charts-container">

                <div className="res-status">
                    <ResStatus />
                </div>
                <div className="tax-report">
                    <TaxReport />
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