import { onSetFilter } from "../store/stay.actions"
import { stayService } from "./stay.service"

export function getWishFilter(user) {
    let userFilter = stayService.getEmptyFilter()
    userFilter.userId = user._id
    onSetFilter(userFilter)
}

export function cleanFilter() {
    let userFilter = stayService.getEmptyFilter()
    userFilter.userId = ''
    onSetFilter(userFilter)
}