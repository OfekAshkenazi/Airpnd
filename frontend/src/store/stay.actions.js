import { stayService } from '../services/stay.service.js';
import { userService } from '../services/user.service.js';
import { ADD_STAY, REMOVE_STAY, SET_FILTER, SET_STAYS, SET_WISHES, UPDATE_STAY } from './stay.reducer.js';
import { store } from './store.js';

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

export function getActionSetWishes(wishes) {
    return {
        type: SET_WISHES,
        wishes
    }
}

export function getActionUpdateStay(stay) {
    return {
        type: UPDATE_STAY,
        stay
    }
}

export async function loadStays(filterBy) {
    try {
        const stays = await stayService.query(filterBy)
        store.dispatch({
            type: SET_STAYS,
            stays
        })

    } catch (err) {
        throw err
    }
}

export async function loadWishes(filterBy) {
    try {
        const user = userService.getLoggedinUser()
        filterBy.userId = user._id
        const wishes = await stayService.query(filterBy)
        store.dispatch(getActionSetWishes(wishes))

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
        store.dispatch(getActionAddStay(savedStay))
        return savedStay
    } catch (err) {
        console.log('Cannot add stay', err)
        throw err
    }
}

export async function updateStay(stay) {
    try {
        const savedStay = await stayService.save(stay)
        store.dispatch(getActionUpdateStay(savedStay))
        return savedStay
    } catch (err) { console.log(err); throw err }
}

export function onSetFilter(filterBy) {
    return store.dispatch({ type: SET_FILTER, filterBy })
}

