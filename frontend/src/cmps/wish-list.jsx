import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';

import { showErrorMsg } from '../services/event-bus.service.js';
import { stayService } from '../services/stay.service.js';
import { onSetFilter } from '../store/stay.actions.js';
import { ToggleDetails } from '../store/system.action.js';
import { WishPreview } from './wish-preview.jsx';

export function WishList() {
    const [wishes, setWishes] = useState([])
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    useEffect(() => {
        onLoadWishes()
        ToggleDetails(true)
    }, [])

    async function onLoadWishes() {
        try {
            // let userFilter = stayService.getEmptyFilter()
            // userFilter.userId = user._id
            // onSetFilter(userFilter)
            const dataStays = await stayService.query()
            const filterStay = dataStays.filter(stay => user.wishList.includes(stay._id))
            setWishes(filterStay)
        } catch (err) {
            console.log(err)
            showErrorMsg('Cannot load wishes')
        }
    }
    function onMoveToWishDetails(wishId) {
        navigate(`/stay/${wishId}`)
    }
    if (!wishes.length) return <div className="loader"><PropagateLoader color="#ff395c" /></div>
    return (
        <ul className="wishList-list">
            {wishes.map(wish => <li key={wish._id}>
                <WishPreview onMoveToWishDetails={onMoveToWishDetails} wish={wish} />
            </li>)}
        </ul>
    )
}