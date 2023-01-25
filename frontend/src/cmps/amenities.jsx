export function Amenities({ stay }) {
    return (
        <section className="amenities">
            <h2>What this place offers</h2>
            <div className="offers">{stay.amenities.slice(0, 10).map((amenitie, index) => {
                amenitie = amenitie.replace("/", "")
                return <div key={index} className="amenitie">
                    <img className="amenitie-img" src={require(`../assets/img/amenities/${amenitie.split(" ").shift().toLowerCase()}.png`)}
                    /><span>{amenitie}</span></div>
            })}</div>
        </section>
    )
}
