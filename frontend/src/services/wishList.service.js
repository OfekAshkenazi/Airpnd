import { onSetFilter } from "../store/stay.actions"
import { stayService } from "./stay.service"


export function getWishFilter(user) {
    let userFilter = stayService.getEmptyFilter()
    userFilter.userId = user._id
    onSetFilter(...userFilter)
    return userFilter
}


export function cleanFilter() {
    let userFilter = stayService.getEmptyFilter()
    onSetFilter(userFilter)
}

export function getHostOrderFilter(user) {
    let hostFilter = stayService.getEmptyFilter()
    hostFilter.hostId = user._id
    onSetFilter(hostFilter)
}