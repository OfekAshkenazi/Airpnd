import { useState } from "react"

export function ReviewPreview({ review }) {
    const [showFullReview, setShowFullReview] = useState(false);

    return (
        <article className="review-preview">
            <div className="review-header flex">
                <div className="user-img-review">
                    <img src={review.by.imgUrl} alt="" />
                </div>
                <div className="review-header-details">
                    <h4>{review.by.fullname}</h4>
                    <p>{review.date}</p>
                </div>
            </div>
            <p className="txt">
    {review.txt.length > 200
        ? <>
            {!showFullReview ? `${review.txt.slice(0, 200)}...` : review.txt}
            <button className="more-btn" onClick={() => setShowFullReview(!showFullReview)}>
                {!showFullReview ? "Show more" : "Show less"}
            </button>
        </>
        : review.txt}
</p>
        </article>
    )
}