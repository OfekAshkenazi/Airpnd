import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"

export function ImageSlider({ images, stayId }) {
    let [idx, setIdx] = useState(0)
    const navigate = useNavigate()

    function fixIdxForImages(diff) {
        idx += diff
        if (idx > images.length - 1) {
            idx = 0
        } else if (idx === -1) {
            idx = images.length - 1
        }
        setIdx(idx)
    }

    function onMoveToStayDetails(stayId) {
        navigate(`/stay/${stayId}`)
    }

    return (
        <>
            <img onClick={() => onMoveToStayDetails(stayId)} src={images[idx]} />
            <div className="slider-btn flex">
                <button onClick={() => fixIdxForImages(-1)}><FontAwesomeIcon icon={faAngleLeft} /> </button>
                <button onClick={() => fixIdxForImages(1)}><FontAwesomeIcon icon={faAngleRight} /></button>
            </div>
        </>

    )
}