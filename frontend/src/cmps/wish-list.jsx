import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';

import { showErrorMsg } from '../services/event-bus.service.js';
import { stayService } from '../services/stay.service.js';
import { cleanFilter, getWishFilter } from '../services/wishList.service.js';
import { loadWishes } from '../store/stay.actions.js';
import { ToggleDetails } from '../store/system.action.js';
import { WishPreview } from './wish-preview.jsx';

export function WishList() {
    const wishes = useSelector(storeState => storeState.stayModule.wishes)
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const { userId } = useParams()

    useEffect(() => {
        onLoadWishes()
        ToggleDetails(true)

        return () => {
            cleanFilter()
        }
    }, [wishes])

    async function onLoadWishes() {
        try {
            getWishFilter(userId)
            await loadWishes(filterBy)
        } catch (err) {
            console.log(err)
            showErrorMsg('Cannot load wishes')
        }
    }

    function onMoveToWishDetails(wishId) {
        navigate(`/stay/${wishId}`)
    }

    return (
        < ul className="wishList-list" >
            {
                wishes.map(wish => <li key={wish._id}>
                    <WishPreview onMoveToWishDetails={onMoveToWishDetails} wish={wish} />
                </li>)
            }
        </ul >

    )
}