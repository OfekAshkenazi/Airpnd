import { useState } from "react"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight, faHeart } from "@fortawesome/free-solid-svg-icons"
import IconHeart from "../assets/svg/heart-icon"
import IconHeartRed from "../assets/svg/icon-heart-red"

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

    function getIconForHeart() {
        if (stay.likedByUsers < 1) {
            return <IconHeart />
        } else {
            return <IconHeartRed />
        }
    }

    return (
        <article className="stay-grid" >
            <div className="img-container"  >
                <img onClick={() => onMoveToStayDetails(stay._id)} src={stay.imgUrls[idx]} alt="" />
                <div className="wish-list" onClick={() => onAddToWishList(stay._id)} >
                    {getIconForHeart()}
                </div>
                <div className="slider-btn flex">
                    <button onClick={() => fixIdxForImages(-1)}><FontAwesomeIcon icon={faAngleLeft} /> </button>
                    <button onClick={() => fixIdxForImages(1)}><FontAwesomeIcon icon={faAngleRight} /></button>
                </div>
            </div>
            <div className="stay-small-details grid" onClick={() => onMoveToStayDetails(stay._id)}>
                <div className="small-details-header flex">
                    <div className="loc">
                        {stay.loc.city}, {stay.loc.country}
                    </div>
                    <div className="flex">
                        <FontAwesomeIcon icon={faStar} />
                        4.9
                    </div>
                </div>
                <p>{stay.loc.address}</p>
                <p>{stay.price} night</p>
            </div>
        </article >
    )
}