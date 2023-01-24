import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FilterWhoModal } from '../cmps/filter-who-modal.jsx';
import { StayList } from '../cmps/stay.list.jsx';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { stayService } from '../services/stay.service.local.js';
import { userService } from '../services/user.service.js';
import { addStay, loadStays, removeStay, updateStay } from '../store/stay.actions.js';
import { ToggleDetails } from '../store/system.action.js';

export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const user = useSelector(storeState => storeState.userModule.user)

    const navigate = useNavigate()
    useEffect(() => {
        loadStays(filterBy)
        ToggleDetails(false)
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
            // for demo
            stay.inWishList = !stay.inWishList
            // for real
            stay.likedByUsers.push(user._id)
            await updateStay(stay)
            user.wishList.push(stay._id)
            await userService.update(user._id)
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

    return (
        <section className={`stay-container `}>
            {<StayList onAddToWishList={onAddToWishList} stays={stays} onMoveToStayDetails={onMoveToStayDetails} />}
        </section>

    )
}