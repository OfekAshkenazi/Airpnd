import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PropagateLoader from 'react-spinners/PropagateLoader.js';

import { StayList } from '../cmps/stay.list.jsx';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { stayService } from '../services/stay.service.js';
import { userService } from '../services/user.service.js';
import { addStay, loadStays, removeStay, updateStay } from '../store/stay.actions.js';
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

    async function onAddToWishList(stayId) {
        try {
            const stay = await stayService.getById(stayId)
            if (stay.likedByUsers.includes(user._id)) {
                const idxUserId = stay.likedByUsers.indexOf(user._id)
                stay.likedByUsers.splice(idxUserId, 1)
                await updateStay(stay)
                const idxStayId = user.wishList.indexOf(stay._id)
                user.wishList.splice(idxStayId, 1)
                await updateUser(user, user._id)
            } else {
                stay.likedByUsers.push(user._id)
                await updateStay(stay)
                user.wishList.push(stay._id)
                await updateUser(user, user._id)
            }
        } catch (err) {
            showErrorMsg('Cannot Add To Wish-list')
        }
    }

    function onMoveToStayDetails(stayId) {
        navigate(`/stay/${stayId}`)
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