import { useEffect, useState } from "react";
import { reviewService } from "../services/review.service";
import { ReviewPreview } from "./review-preview";
export function ReviewList({ stay }) {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        onLoadReviews()
    }, [])

    async function onLoadReviews() {
        try {
            const ReviewsFromData = await reviewService.query()
            setReviews(ReviewsFromData)
        } catch (err) {
            console.log(err)
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

    return (
        <section className="review-list">
            <h2 className="flex">
                <img style={{ width: '18px', height: '18px' }} src={require("../assets/img/icons/star.png")} />
                {getRating()}
                <span className="seperator">·</span>
                <p>7 reviews</p>
            </h2>
            <div className="review-head-lins">
                <p>CleanLiness</p>
                <span className="progress-container">
                    <progress max="5" value={getRating()}></progress>{getRating()}
                </span>
                <p>Communication</p>
                <span className="progress-container">
                    <progress max="5" value="5"></progress>5
                </span>
                <p>Check-in</p>
                <span className="progress-container">
                    <progress max="5" value={getRating()}></progress>{getRating()}
                </span>
                <p>Accuracy</p>
                <span className="progress-container">
                    <progress max="5" value={getRating()}></progress>{getRating()}
                </span>
                <p>Location</p>
                <span className="progress-container">
                    <progress max="5" value="5"></progress>5
                </span>
                <p>Value</p>
                <span className="progress-container">
                    <progress max="5" value={getRating()}></progress>{getRating()}
                </span>
            </div>
            <ul className="review-list-preview">
                {reviews.map(review => <li key={review._id}>
                    <ReviewPreview review={review} />
                </li>)}
            </ul>
        </section>
    )
}