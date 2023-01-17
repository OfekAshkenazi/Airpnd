export function StayPreview({ stay }) {
    return (
        <article className="stay-card">
            <div className="img-container">
                <img src={stay.imgUrls[0]} alt="" />
            </div>
            <div className="stay-small-data">
                <div className="flex">{stay.loc.city}</div>
            </div>
        </article>
    )
}