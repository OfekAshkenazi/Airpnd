import { stayService } from "../services/stay.service.local.js";
import { userService } from "../services/user.service.js";
import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_STAY, REMOVE_STAY, SET_STAYS, UNDO_REMOVE_STAY, UPDATE_STAY } from "./stay.reducer.js";


// Action Creators:
export function getActionRemoveStay(stayId) {
    return {
        type: REMOVE_STAY,
        stayId
    }
}
export function getActionAddStay(stay) {
    return {
        type: ADD_STAY,
        stay
    }
}
export function getActionUpdateStay(stay) {
    return {
        type: UPDATE_STAY,
        stay
    }
}

export async function loadStays() {
    try {
        const stays = await stayService.query()
        store.dispatch({
            type: SET_STAYS,
            stays
        })

    } catch (err) {
        throw err
    }
}

export async function removeStay(stayId) {
    try {
        await stayService.remove(stayId)
        store.dispatch(getActionRemoveStay(stayId))
    } catch (err) {
        console.log('Cannot remove stay', err)
        throw err
    }
}

export async function addStay(stay) {
    try {
        const savedStay = await stayService.save(stay)
        console.log('Added Stay', savedStay)
        store.dispatch(getActionAddStay(savedStay))
        return savedStay
    } catch (err) {
        console.log('Cannot add stay', err)
        throw err
    }
}

export function updateStay(stay) {
    return stayService.save(stay)
        .then(savedStay => {
            console.log('Updated Car:', savedStay)
            store.dispatch(getActionUpdateStay(savedStay))
            return savedStay
        })
        .catch(err => {
            console.log('Cannot save car', err)
            throw err
        })
}


// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
// export function onRemoveCarOptimistic(carId) {
//     store.dispatch({
//         type: REMOVE_CAR,
//         carId
//     })
//     showSuccessMsg('Car removed')

//     carService.remove(carId)
//         .then(() => {
//             console.log('Server Reported - Deleted Succesfully');
//         })
//         .catch(err => {
//             showErrorMsg('Cannot remove car')
//             console.log('Cannot load cars', err)
//             store.dispatch({
//                 type: UNDO_REMOVE_CAR,
//             })
//         })
// }
