import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ReviewList } from '../cmps/review-llist'
import { GoogleMap } from '../cmps/google-map.details.jsx';
import { ReserveBtn } from '../cmps/reserve-btn.jsx'

import { StayExpanded } from '../cmps/stay-expanded.jsx'
import { stayService } from "../services/stay.service.js"
import { ToggleDetails } from "../store/system.action.js"
import { useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';


export function StayDetails() {
    const [stay, setStay] = useState(null)
    const { stayId } = useParams()
    const currOrder = useSelector(storeState => storeState.systemModule.order)
    const [order, setOrder] = useState([currOrder])

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
        return (stay.reviews.reduce((acc, review) => acc + review.rate, 0) / stay.reviews.length).toFixed(2)
    }

    if (!stay) return <div className="loader"><PropagateLoader color="#ff395c" /></div>

    return <section className="stay-details">
        <h1 className="stay-name">{stay.name}</h1>
        <div className="stay-info flex align-center">
            <div className='flex align-center'>
                <img className="img-star" src={require("../assets/img/icons/star.png")} />
                <span>{getRating()}</span>
                {console.log(stay)}
                <span className="seperator">·</span>
                <span className="stay-reviews">{(stay.reviews.length)} reviews</span>
                <span className="seperator">·</span>
                <span className="stay-location">{stay.loc.city}, {stay.loc.country}</span>
            </div>
            <div className="action-btn ">
                <div className="duo"><img src={require("../assets/img/icons/share.png")} />
                    <button className="share-btn">Share</button></div>
                <div className="duo"><img src={require("../assets/img/icons/heart.png")} />
                    <button className="save-btn">Save</button></div>
            </div>
        </div>
        <div className="imgs-container">
            {stay.imgUrls.slice(0, 5).map((url, index) => (
                <div key={index} className={`grid-img-${index + 1}`}>
                    <img src={url} />
                </div>
            ))}
        </div>
        <StayExpanded stay={stay} getRating={getRating} />
        <ReviewList stay={stay} />
        <div className="reserve-mobile">
            <div className="info-side">
                <div className="price">{stay.price}$ <span className="night"> night </span> </div>
                <span className="dates">dates</span>
            </div>
            <ReserveBtn className="mobile-btn" order={order} numericDate={new Date} stay={1} totalPrice={1} />
        </div>
        <GoogleMap lat={+stay.loc.lat} lng={+stay.loc.lan} />
    </section>
}

//
// 