import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ImageSlider } from "./image-silder"

export function StayPreview({ stay }) {

    return (
        <article className="stay-grid">
            <div className="img-container" style={{ cursor: 'pointer' }} >
                <ImageSlider stayId={stay._id} images={stay.imgUrls} />
            </div>
            <div className="stay-small-details grid">
                <div className="flex">
                    <div className="loc">
                        {stay.loc.city} {stay.loc.country}
                    </div>
                    <FontAwesomeIcon icon={faStar} />
                </div>
                <p>{stay.loc.address}</p>
                <p>{stay.price} night</p>
            </div>

        </article>
    )
}