import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

 

    useEffect(() => {
        getWishFilter(user._id)
        onLoadWishes()
        ToggleDetails(true)

        return () => {
            cleanFilter()
        }
    }, [])

    async function onLoadWishes() {
        try {
           await loadWishes()
           
        } catch (err) {
            console.log(err)
            showErrorMsg('Cannot load wishes')
        }
    }


    function onMoveToWishDetails(wishId) {
        navigate(`/stay/${wishId}`)
    }

    function getWishFilter(userId) {
        let userFilter = structuredClone(filterBy)
        userFilter.userId = userId
        onSetFilter(userFilter)
        return userFilter
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