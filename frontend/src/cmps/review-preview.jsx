
export function ReviewPreview({ review }) {

    console.log(review)
    return (
        <article>
            <div className="review-header">
                <div className="user-img-review">
                    {/* <img src={require(`${review.by.imgUrl}`)} alt="" /> */}
                </div>
            </div>
        </article>
    )
}