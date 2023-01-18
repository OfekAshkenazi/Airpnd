import { ImageSlider } from "./image-silder"

export function StayPreview({ stay }) {
  
    return (
        <article className="stay-grid">
            <div className="img-container" style={{ cursor: 'pointer' }} >
                <ImageSlider stayId={stay._id} images={stay.imgUrls} />
            </div>
            <div className="stay-small-data">
                <div className="flex">{stay.loc.city} {stay.loc.country}</div>
                <p>{stay.loc.address}</p>
                <p>{stay.price} night</p>
            </div>
        </article>
    )
}