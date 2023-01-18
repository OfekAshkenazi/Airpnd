import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { StayExpanded } from '../cmps/stay-expanded.jsx'

import { stayService } from "../services/stay.service.local.js"

export function StayDetails() {
    const [stay, setStay] = useState(null)
    const { stayId } = useParams()

    useEffect(() => {
        loadStay()
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
            Star {getRating()}
            <span className="seperator">·</span>
            <span className="stay-reviews">{(stay.reviews.length)} reviews</span>
            <span className="seperator">·</span>
            <span className="stay-location">{stay.loc.city}, {stay.loc.country}</span>
            <div className="action-btn ">
                <button className="share-btn"> Share</button>
                <button className="save-btn"> Save</button>
            </div>
        </div>
        <div className="imgs-container">
            <div className="grid-img-1"><img src={stay.imgUrls[0]} alt="" /></div>
            <div className="grid-img-2"><img src={stay.imgUrls[0]} alt="" /></div>
            <div className="grid-img-3"><img src={stay.imgUrls[0]} alt="" /></div>
            <div className="grid-img-4"><img src={stay.imgUrls[0]} alt="" /></div>
            <div className="grid-img-5"><img src={stay.imgUrls[0]} alt="" /></div>
        </div>
        <StayExpanded stay={stay} />
    </section>
}