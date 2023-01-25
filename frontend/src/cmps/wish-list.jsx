import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { showErrorMsg } from "../services/event-bus.service.js"
import { stayService } from "../services/stay.service.js"
import { ToggleDetails } from "../store/system.action.js"
import { WishPreview } from "./wish-preview.jsx"

export function WishList() {
    const [wishes, setWishes] = useState([])
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
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
    function onMoveToWishDetails(wishId) {
        navigate(`/stay/${wishId}`)
    }

    return (
        <ul className="wishList-list">
            {wishes.map(wish => <li key={wish._id}>
                <WishPreview onMoveToWishDetails={onMoveToWishDetails} wish={wish} />
            </li>)}
        </ul>
    )
}