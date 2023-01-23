export function ReviewPreview({ review }) {

    return (
        <article>
            <div className="review-header flex">
                <div className="user-img-review">
                    <img src={review.by.imgUrl} alt="" />
                </div>
                <div className="review-header-details">
                    <h4>{review.by.fullname}</h4>
                    <p>{review.date}</p>
                </div>
            </div>
            <p>{review.txt}</p>
        </article>
    )
}