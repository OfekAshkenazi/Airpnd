import { useEffect } from "react"
import { ToggleDetails } from "../store/system.action.js"

export function WishList() {
    useEffect(() => {
        ToggleDetails(true)
    })

    return (
        <section>hiaaa from wish list</section>
    )
}