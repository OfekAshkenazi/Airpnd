import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ImageSlider } from './image-silder';

export function StayPreview({ stay, onAddToWishList, onMoveToStayDetails, randomDates }) {

    function getRating() {
        if (!stay.reviews || stay.reviews.length === 0) {
            return null
        }
        let totalRating = 0;
        stay.reviews.forEach(review => {
            totalRating += review.rate
        })
        return (totalRating / stay.reviews.length).toFixed(2)
    }


    const stayPrice = (parseFloat(JSON.stringify(stay.price).replace(/,/g, ''))).toLocaleString()

    return (
        <article className="stay-grid" >
            <ImageSlider stay={stay} onAddToWishList={onAddToWishList} />


            <div className="stay-small-details grid" onClick={() => onMoveToStayDetails(stay._id)}>
                <div className="small-details-header flex">
                    <div className="loc">
                        {stay.loc.city}, {stay.loc.country}
                    </div>
                    <div className="preview-rate flex">
                        <FontAwesomeIcon style={{ width: '13px' }} icon={faStar} />
                        {getRating()}
                    </div>
                </div>
                <p>{stay.loc.address}</p>
                <p>{randomDates}</p>
                <p className='priceP'>$ <span>{stayPrice}</span><span> night</span></p>
            </div>
        </article >
    )
}