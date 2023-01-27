import { TotalEarn } from "./total-earn";
import { TaxReport } from '../cmps/tax-report.jsx';

export function DasheBoard() {
    return (
        <section className="dashboard-page">
            <section className="charts-container">
                <div className="chart-container">
                    <TotalEarn className="chart-container" />
                </div>
                <div className="chart-container"><TaxReport />
                </div>
                <div className="chart-container"><TaxReport />
                </div>
            </section>
        </section>
    )
}