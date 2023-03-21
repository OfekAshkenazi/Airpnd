import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { loadStays, removeStay } from "../store/stay/stay.actions"

export function HostStayList() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const [myStays, setMyStays] = useState([])
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    useEffect(() => {
        loadStaysForHost()
    }, [])

    useEffect(() => {
        loadMyStays()
    }, [stays])

    async function loadStaysForHost() {
        try {
            await loadStays(filterBy)
        } catch (err) {
            console.log(err)
        }
    }

    function loadMyStays() {
        setMyStays(stays.filter(stay => stay.host._id === user._id))
    }

    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('stay removed')
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }

    if (!myStays) return <h2>loading</h2>

    return (
        <section className="host-stay-list">
            {myStays.map(stay =>
                <div key={stay._id} className="host-stay-preview">

                    <div className="host-stay-preview-imgs">
                        <img src={stay.imgUrls[0]} />
                        <img src={stay.imgUrls[1]} />
                        <img src={stay.imgUrls[2]} />
                    </div>

                    <div className="right-side-info flex column">

                        <div className="flex column">
                            <p>{stay.host.fullname}</p>
                            <p>{stay.host.location}</p>
                        </div>

                        <div className="action-btns">
                            <button onClick={() => navigate(`/host/edit-stay/${stay._id}`)} className="update">Update</button>
                            <button onClick={() => onRemoveStay(stay._id)} className="remove">Delete</button>
                        </div>
                    </div>

                </div>)}
        </section>
    )
}