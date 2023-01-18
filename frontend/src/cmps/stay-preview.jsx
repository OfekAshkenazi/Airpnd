import { Link, useNavigate } from "react-router-dom"

export function StayPreview({ stay }) {
    const navigate = useNavigate()

    function onMoveToStayDetails(stayId) {
        navigate(`/stay/${stayId}`)
    }


    return (
        <article className="stay-card">
            <div className="img-container" style={{ cursor: 'pointer' }} onClick={() => onMoveToStayDetails(stay._id)}>
                <img src={stay.imgUrls[0]} alt="" />
            </div>
            <div className="stay-small-data">
                <div className="flex">{stay.loc.city} {stay.loc.country}</div>
                <p>{stay.loc.address}</p>
                <p>{stay.price} night</p>
            </div>
        </article>
    )
}