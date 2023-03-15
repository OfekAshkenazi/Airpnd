import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ReviewList } from '../cmps/stay-details/review-list.jsx'
import { GoogleMap } from '../cmps/google-maps/google-map.details.jsx';
import { ReserveBtn } from '../cmps/stay-details/reserve-btn.jsx'

import { StayExpanded } from '../cmps/stay-details/stay-expanded.jsx'
import { stayService } from "../services/stay.service.js"
import { ToggleDetails } from "../store/system.action.js"
import { useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';

export function StayDetails() {
    const [stay, setStay] = useState(null)
    const { stayId } = useParams()
    const order = useSelector(storeState => storeState.orderModule.order)
    const [currOrder, setOrder] = useState(order)

    const navigate = useNavigate()
    useEffect(() => {
        loadStay()
        ToggleDetails(true)
    }, [order])


    function handleBackClick() {
        navigate(-1)
    }

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
                <span className="seperator">·</span>
                <span className="stay-reviews">{(stay.reviews.length)} reviews</span>
                <span className="seperator">·</span>
                <span className="stay-location">{stay.loc.city}, {stay.loc.country}</span>
            </div>
            <div className="action-btn ">
                <button className="back-btn-details" onClick={handleBackClick}>
                    <img onClick={handleBackClick} className="back-img-details" src={require(`../assets/img/icons/back.png`)} />
                </button>
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
        {<StayExpanded stay={stay} getRating={getRating} />}
        <ReviewList stay={stay} />
        <div className="reserve-mobile">
            <div className="info-side">
                <div className="price">{stay.price}$ <span className="night"> night </span> </div>
                <span className="dates">{stayService.extractDate(order.startDate)} - {stayService.extractDate(order.endDate)}</span>
                <span className='back-btn' onClick={() => navigate('/')}>back</span>
            </div>
            <ReserveBtn className="mobile-btn" order={currOrder} numericDate={new Date} stay={stay} totalPrice={order.totalPrice} />
        </div>
        <GoogleMap lat={+stay.loc.lan} lng={+stay.loc.lat} />
    </section>
}
