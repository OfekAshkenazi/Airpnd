import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PropagateLoader from 'react-spinners/PropagateLoader.js';

import { StayList } from '../cmps/stay/stay.list.jsx';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { stayService } from '../services/stay.service.js';
import { addStay, loadStays, removeStay, updateStay } from '../store/stay/stay.actions.js';
import { ToggleDetails } from '../store/system.action.js';
import { updateUser } from '../store/user.actions.js';

export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

    const [searchParams, setSearchParams] = useSearchParams()
    const queryFilterBy = stayService.getFilterFromSearchParams(searchParams)

    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()


    useEffect(() => {
        ToggleDetails(false)
        loadStays(queryFilterBy)
    }, [filterBy])

    //work
    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('stay removed')
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }
    //work
    async function onAddStay(stay) {
        try {
            const savedStay = await addStay(stay)
            showSuccessMsg(`Stay added (id: ${savedStay._id})`)
        } catch (err) {
            showErrorMsg('Cannot add Stay')
        }
    }

    async function onAddToWishList(ev,stayId) {
        ev.stopPropagation()
        try {
            const stay = await stayService.getById(stayId)
            const idxUserId = stay.likedByUsers.indexOf(user._id)
            const isLikedByUser = idxUserId !== -1

            if (isLikedByUser) {
                stay.likedByUsers.splice(idxUserId, 1)
                user.wishList.splice(user.wishList.indexOf(stay._id), 1)
            } else {
                stay.likedByUsers.push(user._id)
                user.wishList.push(stay._id)
            }

            await Promise.all([updateStay(stay), updateUser(user, user._id)])
        } catch (err) {
            showErrorMsg('Cannot Add To Wish-list')
        }
    }

    function onMoveToStayDetails(ev, stayId) {
        if (!ev.target.type) {
            navigate(`/stay/${stayId}`)
        }
    }

    async function onUpdateStay(stayToSave) {
        try {
            const savedStay = await updateStay(stayToSave)
            showSuccessMsg(`Stay updated`)
        } catch (err) {
            showErrorMsg('Cannot update car')
        }
    }

    if (!stays.length) return <div className="loader"><PropagateLoader color="#ff395c" /></div>

    return (
        <section className={`stay-container `}>
            {<StayList onAddToWishList={onAddToWishList} stays={stays} onMoveToStayDetails={onMoveToStayDetails} />}
        </section>
    )
}