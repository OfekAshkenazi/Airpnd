// import { useEffect, useState } from "react"
// import { reviewService } from "../services/review.service"
import { ReviewPreview } from "./review-preview"
export function ReviewList({ stay }) {
    // const [reviews, setReviews] = useState([])

    // useEffect(() => {
    //     onLoadReviews()
    // }, [])

    // async function onLoadReviews() {
    //     try {
    //         const ReviewsFromData = await reviewService.query()
    //         setReviews(ReviewsFromData)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    function getRating() {
        if (!stay.reviews || stay.reviews.length === 0) {
            return null
        }
        return (stay.reviews.reduce((acc, review) => acc + review.rate, 0) / stay.reviews.length).toFixed(2)
    }

    return (
        <section className="review-list">
            <h2 className="flex">
                <img className ="star-img" style={{ width: '18px', height: '18px' }} src={require("../assets/img/icons/star.png")} />
                {getRating()}
                <span className="seperator">·</span>
                <p>7 reviews</p>
            </h2>
            <div className="review-head-lins">
                <p>Cleanliness</p>
                <span className="progress-container">
                    <progress max="5" value={4.8}></progress>4.8
                </span>
                <p>Communication</p>
                <span className="progress-container">
                    <progress max="5" value={4.3}></progress>4.3
                </span>
                <p>Check-in</p>
                <span className="progress-container">
                    <progress max="5" value={4.7}></progress>4.7
                </span>
                <p>Accuracy</p>
                <span className="progress-container">
                    <progress max="5" value={4.4}></progress>4.4
                </span>
                <p>Location</p>
                <span className="progress-container">
                    <progress max="5" value="5"></progress>5
                </span>
                <p>Value</p>
                <span className="progress-container">
                    <progress max="5" value={4.9}></progress>4.9
                </span>
            </div>
            <ul className="review-list-preview">
                {stay.reviews.map(review => <li key={review.by.id}>
                    <ReviewPreview review={review} />
                </li>)}
            </ul>

        </section>
    )
}