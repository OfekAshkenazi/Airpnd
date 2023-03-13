import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';

import { showErrorMsg } from '../../services/event-bus.service.js';
import { cleanFilter } from '../../services/wishList.service.js';
import { loadWishes } from '../../store/stay/stay.actions.js';
import { ToggleDetails } from '../../store/system.action.js';
import { WishPreview } from './wish-preview.jsx';

export function WishList() {
    const wishes = useSelector(storeState => storeState.stayModule.wishes)
    const navigate = useNavigate()
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

    useEffect(() => {
        onLoadWishes(filterBy)
        ToggleDetails(true)

        return () => {
            cleanFilter()
        }
    }, [])

    async function onLoadWishes(filterBy) {
        try {
            await loadWishes(filterBy)
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