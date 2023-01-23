import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { showErrorMsg } from "../services/event-bus.service.js"
import { stayService } from "../services/stay.service.local.js"
import { ToggleDetails } from "../store/system.action.js"

export function WishList() {
    const [wishes, setWishes] = useState([])
    const user = useSelector(storeState => storeState.userModule.user)
    console.log(wishes)

    useEffect(() => {
        onLoadWishes()
        ToggleDetails(true)
    }, [])

    async function onLoadWishes() {
        try {
            const dataStays = await stayService.query()
            const filterStay = dataStays.filter(stay => user.wishList.includes(stay._id))
            setWishes(filterStay)
        } catch (err) {
            console.log(err)
            showErrorMsg('Cannot load wishes')
        }
    }

    return (
        <section className="wishList-list">
            <ul>
                {/* {wishes.} */}
            </ul>
        </section>
    )
}