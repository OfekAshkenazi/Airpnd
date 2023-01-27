import { TaxReport } from '../cmps/tax-report.jsx';
import { GoogleMapHostStays } from './google-map-host-stays.jsx';
import { TotalEarn } from './total-earn';
import { TotalExpenses } from './total-expenses.jsx';

export function DasheBoard() {
    return (
        <section className="dashboard-page">
            <section className="charts-container">
                <div className="chart-container total-earn">
                    <TotalEarn  />
                </div>
                <div className="chart-container total-expenses">
                    <TotalExpenses />
                </div>
                <div className="chart-container">
                    <TaxReport />
                </div>
            </section>
            <GoogleMapHostStays />
        </section>
    )
}