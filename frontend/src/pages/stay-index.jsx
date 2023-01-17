import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, addStay, updateStay, removeStay } from '../store/stay.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stayService } from '../services/stay.service.local.js'

export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)

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
        <section>
            <main>
              hi
            </main>
        </section>
    )
}