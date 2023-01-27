import { TotalEarn } from "./total-earn";

export function DasheBoard() {
    return (
        <section className="dashboard-page">
            <section className="charts-container">
                <div className="chart-container">
                    <TotalEarn />
                </div>
             
            </section>
        </section>
    )
}