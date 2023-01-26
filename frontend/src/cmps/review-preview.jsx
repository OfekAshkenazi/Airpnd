import { useState } from "react"

export function ReviewPreview({ review }) {
    const [showFullReview, setShowFullReview] = useState(false)

    function getRandomDate() {
        var currentDate = new Date()
        var pastDate = new Date()
        pastDate.setFullYear(currentDate.getFullYear() - 5)
        var date = new Date(pastDate.getTime() + Math.random() * (currentDate.getTime() - pastDate.getTime()))

        var month = date.toLocaleString('default', { month: 'long' })
        var year = date.getFullYear()
        return month + " " + year
    }

    return (
        <article className="review-preview">
            <div className="review-header flex">
                <div className="user-img-review">
                    <img src={review.by.imgUrl} alt="" />
                </div>
                <div className="review-header-details">
                    <h4 className="name">{review.by.fullname}</h4>
                    <p className="date">{getRandomDate()}</p>
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