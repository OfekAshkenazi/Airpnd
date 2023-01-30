import { utilService } from "../services/util.service";
import { StayPreview } from "./stay-preview";

export function StayList({ stays, onAddToWishList, onMoveToStayDetails }) {
    const randomDates = ['Jan 31 - Feb 7', 'Feb 7 - Feb 14', 'Feb 14 - Feb 21', 'Feb 21 - Feb 28', 'March 1 - March 8', 'March 8 - March 15', 'March 15 - March 23', 'March 23 - March 31', 'April 1 - April 8', 'April 8 - April 15', 'April 15 - April 23', 'April 23 - Mai 1', 'Mai 1 - Mai 8', 'Mai 8 - Mai 15', 'Mai 15 - Mai 23', 'Mai 23 - June 1', 'June 1 - June 8']

    return (
        <ul className="stay-list">
            {stays.map(stay => <li key={stay._id}>
                <StayPreview randomDates={randomDates[utilService.getRandomIntInclusive(0, randomDates.length - 1)]} onAddToWishList={onAddToWishList} stay={stay} onMoveToStayDetails={onMoveToStayDetails} />
            </li>)}
        </ul>
    )
}