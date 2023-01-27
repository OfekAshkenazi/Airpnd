export function TaxReport() {
    return <section className="tax-report">
        <div className="tax-left">
            <div className="tax-head">
                <span className="important">Important</span>
                <span className="tax">Tax Report</span>
            </div>
            <div className="tax-bottom">
                <div className="prepare">Prepare you yearly tax reports untill <span>Dev 23</span></div></div>
        </div>
        <img src={require(`../assets/img/tax.png`)} />
    </section>
}