

export function StayExpanded({ stay }) {
    const firstName = stay.host.fullname.split(" ")[0]

    return <section className="stay-expanded">
        <div className="capacity">
        <div className="dwd"><h2>{stay.type} hosted by {firstName}</h2>
            {stay.capacity} guests
            <span className="seperator">·</span>
            2 beds
            <span className="seperator">·</span>
            1 bath </div>
            <div className="capacity-img"><img src={stay.host.imgUrl} alt="" /></div>
        </div>
        
    </section>
}