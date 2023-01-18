

export function StayExpanded({ stay }) {
    const firstName = stay.host.fullname.split(" ")[0]
console.log(stay.host.imgUrl)
    return <section className="stay-expanded">
        <h2>{stay.type} hosted by {firstName}</h2>
        <div className="capacity">
        {stay.capacity} guests
        <span className="seperator">·</span>
        2 beds
        <span className="seperator">·</span>
        1 bath
        <img src={stay.host.imgUrl} alt="" />
        </div>
    </section>
}