import { useSelector } from "react-redux"
import { onSetFilter } from "../store/stay.actions"
import { stayService } from "./stay.service"


export function cleanFilter() {
    let userFilter = stayService.getEmptyFilter()
    onSetFilter(userFilter)
}

export function getHostOrderFilter(user) {
    let hostFilter = stayService.getEmptyFilter()
    hostFilter.hostId = user._id
    onSetFilter(hostFilter)
}