import { fa0 } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { StayExpanded } from '../cmps/stay-expanded.jsx'
import IconStarFill from '../assets/svg/IconStar.jsx'
import IconHeart from '../assets/svg/heart-icon.jsx'
import IconShareTwentyFour from '../assets/svg/share-icon.jsx'

import { stayService } from "../services/stay.service.local.js"
import { ToggleDetails } from "../store/system.action.js"

export function StayDetails() {
    const [stay, setStay] = useState(null)
    const { stayId } = useParams()
    useEffect(() => {
        loadStay()
        ToggleDetails(true)
    }, [])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) {
            console.log('Had issues in stay details', err)
            // navigate('/')
        }
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


    if (!stay) return <div>Loading...</div>
    return <section className="stay-details">
        <h1 className="stay-name">{stay.name}</h1>
        <div className="stay-info flex align-center">
            <IconStarFill/><span>{getRating()}</span>
            <span className="seperator">·</span>
            <span className="stay-reviews">{(stay.reviews.length)} reviews</span>
            <span className="seperator">·</span>
            <span className="stay-location">{stay.loc.city}, {stay.loc.country}</span>
            <div className="action-btn ">
                <button className="share-btn"><IconShareTwentyFour/> Share </button>
                <button className="save-btn"> <IconHeart/>Save</button>
            </div>
        </div>
        <div className="imgs-container">
            {stay.imgUrls.slice(0, 5).map((url, index) => (
                <div key={index} className={`grid-img-${index + 1}`}>
                    <img src={url} />
                </div>
            ))}
        </div>
        <StayExpanded stay={stay} />
    </section>
}