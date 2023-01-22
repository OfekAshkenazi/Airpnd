import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft, faAngleRight, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import IconHeart from '../assets/svg/heart-icon';
import IconHeartRed from '../assets/svg/icon-heart-red';

export function StayPreview({ stay, onAddToWishList, onMoveToStayDetails }) {
    let [idx, setIdx] = useState(0)

    function fixIdxForImages(diff) {
        idx += diff
        if (idx > stay.imgUrls.length - 1) {
            idx = 0
        } else if (idx === -1) {
            idx = stay.imgUrls.length - 1
        }
        setIdx(idx)
    }
    function getRating() {
        if (!stay.reviews || stay.reviews.length === 0) {
            return null
        }
        let totalRating = 0;
        stay.reviews.forEach(review => {
            totalRating += review.rate
        })
        return (totalRating / stay.reviews.length).toFixed(1)
    }

    return (
        <article className="stay-grid" >
            <div className="img-container">
                <img onClick={() => onMoveToStayDetails(stay._id)} src={stay.imgUrls[idx]} alt="" />
                <div className="wish-list" onClick={() => onAddToWishList(stay._id)} >
                    {stay.inWishList ? <IconHeartRed /> : <IconHeart />}
                </div>
                <div className="slider-btn flex">
                    <button onClick={() => fixIdxForImages(-1)}><FontAwesomeIcon icon={faAngleLeft} /> </button>
                    <button onClick={() => fixIdxForImages(1)}><FontAwesomeIcon icon={faAngleRight} /></button>
                </div>
                <div className="doots">
                    {stay.imgUrls.map((url, index) => <div onClick={() => setIdx(index)} key={url} className="doot"></div>)}
                </div>
            </div>
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
                <p>$ {stay.price} night</p>
            </div>
        </article >
    )
}