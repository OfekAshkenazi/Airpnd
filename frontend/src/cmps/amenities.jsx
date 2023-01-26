import { useState } from "react"
import { AmenitiesPreview } from "../cmps/amenities-preview.jsx"

export function Amenities({ stay }) {

    const [isModalOpen, setisModalOpen] = useState(false)

    function toggleModal() {
        setisModalOpen(!isModalOpen)
    }

    return (
        <section className="amenities">
            {isModalOpen && <div className="amenities-modal">
            <ul className="amenities-list">
                <h2>What this place offers</h2>
            {stay.amenities.map((amenitie,index) => <li key={amenitie + index}>
            <AmenitiesPreview amenitie = {amenitie}/>
            </li>)}
        </ul>
            </div>}
            <div className="offers">{stay.amenities.slice(0, 10).map((amenitie, index) => {
                amenitie = amenitie.replace("/", "")
                return <div key={index} className="amenitie">
                    <img className="amenitie-img" src={require(`../assets/img/amenities/${amenitie.split(" ").shift().toLowerCase()}.png`)}
                    /><span className="amenitie-txt">{amenitie}</span></div>
            })}</div>
            <button onClick={toggleModal} className="amenitie-btn">
                Show all {stay.amenities.length} amenities
            </button>
        </section>
    )
}
