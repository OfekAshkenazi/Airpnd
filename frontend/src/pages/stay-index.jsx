import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, addStay, updateStay, removeStay } from '../store/stay.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stayService } from '../services/stay.service.local.js'
import { StayList } from '../cmps/stay.list.jsx'
import { StayFilter } from '../cmps/stay-filter.jsx'

export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

    useEffect(() => {
        loadStays()
    }, [])

    // async function onRemoveStay(stayId) {
    //     try {
    //         await removeStay(stayId)
    //         showSuccessMsg('Car removed')            
    //     } catch (err) {
    //         showErrorMsg('Cannot remove car')
    //     }
    // }

    // async function onAddStay() {
    //     try {
    //         const savedStay = await addStay()
    //         showSuccessMsg(`Stay added (id: ${savedStay._id})`)
    //     } catch (err) {
    //         showErrorMsg('Cannot add Stay')
    //     }        
    // }

    // async function onUpdateCar() {
    //     try {
    //         const savedStay = await updateCar(stayToSave)
    //         showSuccessMsg(`Car updated, new price: ${savedStay.price}`)
    //     } catch (err) {
    //         showErrorMsg('Cannot update car')
    //     }        
    // }

    return (
        <section className="main-container">
            <StayFilter filterBy={filterBy}/>
            <section className="stay-container">
                {<StayList stays={stays}/>}
            </section>
        </section>
    )
}