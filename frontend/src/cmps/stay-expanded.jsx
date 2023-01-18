

export function StayExpanded({ stay }) {
    const firstName = stay.host.fullname.split(" ")[0]

    return <section className="stay-expanded">
        <div className="capacity">
        <h2>{stay.type} hosted by {firstName}</h2>
            {stay.capacity} guests
            <span className="seperator">·</span>
            2 beds
            <span className="seperator">·</span>
            1 bath
        </div>
            <img src={stay.host.imgUrl} alt="" />
    </section>
}