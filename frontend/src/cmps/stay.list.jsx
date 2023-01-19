import { StayPreview } from "./stay-preview";

export function StayList({ stays,onAddToWishList,onMoveToStayDetails }) {
    return (
        <ul className="stay-list">
            {stays.map(stay => <li key={stay._id}>
                <StayPreview onAddToWishList={onAddToWishList} stay={stay} onMoveToStayDetails={onMoveToStayDetails}/>
            </li>)}
        </ul>
    )
}