import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';

import { faHeartbeat, faHeartCircleCheck, faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight, faHeart } from "@fortawesome/free-solid-svg-icons"

export function StayPreview({ stay }) {
const user = useSelector(storeState  => storeState.userModule.user)

    let [idx, setIdx] = useState(0)
    const navigate = useNavigate()

    function fixIdxForImages(diff) {
        idx += diff
        if (idx > stay.imgUrls.length - 1) {
            idx = 0
        } else if (idx === -1) {
            idx = stay.imgUrls.length - 1
        }
        setIdx(idx)
    }

    function onMoveToStayDetails(stayId) {
        navigate(`/stay/${stayId}`)
    }

    function getColorForHeart() {
        const style = {
            color: 'red'
        }
        return style
    }

    function onAddToWishList(stayId) {

    }


    return (
        <article className="stay-grid" >
            <div className="img-container" >
                <div className="img" style={{ backgroundImage: `url(${stay.imgUrls[idx]})` }}>
                    <div className="wish-list">
                        <FontAwesomeIcon className="icon-heart" onClick={() => onAddToWishList(stay._id)} style={getColorForHeart()} icon={faHeart} />
                    </div>
                    <div className="slider-btn flex">
                        <button onClick={() => fixIdxForImages(-1)}><FontAwesomeIcon icon={faAngleLeft} /> </button>
                        <button onClick={() => fixIdxForImages(1)}><FontAwesomeIcon icon={faAngleRight} /></button>
                    </div>
                    {/* <div className="doots">
                        <div className="doot"></div>
                        <div className="doot"></div>
                        <div className="doot"></div>
                        <div className="doot"></div>
                    </div> */}
                </div>
            </div>
            <div onClick={() => onMoveToStayDetails(stay._id)} className="stay-small-details grid">
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