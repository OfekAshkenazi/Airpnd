export function WishPreview({ wish,onMoveToWishDetails }) {
    return (
        <article onClick={() => onMoveToWishDetails(wish._id)}>
            <div className="wish-preview-img-container">
                <img src={wish.imgUrls[0]} />
                <img src={wish.imgUrls[1]} />
                <img src={wish.imgUrls[2]} />
            </div>
            <h3>{wish.name}</h3>
        </article>
    )
}