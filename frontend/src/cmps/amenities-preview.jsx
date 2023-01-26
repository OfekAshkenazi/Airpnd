export function AmenitiesPreview({ amenitie }) {
    amenitie = amenitie.replace("/", "")
    
    return <div className="amenitie-preview">
         <img className="amenitie-img" src={require(`../assets/img/amenities/${amenitie.split(" ").shift().toLowerCase()}.png`)}/>
        {amenitie}
    </div>
}