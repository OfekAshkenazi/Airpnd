import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showErrorMsg } from "../../services/event-bus.service"
import { stayService } from "../../services/stay.service"

export function EditStay() {
    const [stayToEdit, setStayToEdit] = useState(stayService.getEmptyStay())

    const { stayId } = useParams()
    const navigate = useNavigate()

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setStayToEdit({ ...stayToEdit, [field]: value })
    }

    function handlePrice({ target }) {
        let { value, type, name: field } = target
        setStayToEdit({ ...stayToEdit, [field]: +value })
    }

    function handleSelect({ target }) {
        let { value, type, name: field } = target
        setStayToEdit({ ...stayToEdit, [field]: value })

    }

    function handleDesc({ target }) {
        let { value, type, name: field } = target
        setStayToEdit({ ...stayToEdit, [field]: value })
    }

    function handleLabels({ target }) {
        let { value, checked, name: field } = target
        const idx = stayToEdit.amenities.indexOf(value)
        if (idx === -1) {
            stayToEdit.amenities = [...stayToEdit.amenities, value]
        } else if (!checked && idx !== -1) {
            stayToEdit.amenities.splice(idx, 1)
        }
    }

    function onSaveStay() {
        console.log(stayToEdit)
    }

    useEffect(() => {
        if (!stayId) return
        loadStay()
    }, [])


    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStayToEdit(stay)
        } catch (err) {
            showErrorMsg('Cannot load stay')
            navigate('/')
        }
    }



    const amenitiesList = ['24-hour', 'air', 'baby', 'babysitter', 'bathtub', 'bbq', 'beach', 'beachfront', 'bed', 'breakfast', 'building', 'buzzerwireless', 'cable', 'carbon', 'cat(s)', 'cleaning', 'coffee', 'crib', 'disabled', 'dishes', 'dishwasher', 'dog(s)', 'doorman', 'dryer', 'elevator', 'essentials', 'extra', 'familykid', 'fire', 'first', 'flat', 'free', 'garden', 'gym', 'hair', 'handheld', 'hangers', 'heating', 'high', 'host', 'hot', 'internet', 'iron', 'kitchen', 'laptop', 'lock', 'lockbox', 'logo192', 'long', 'luggage', 'microwave', 'oven', 'pack', 'paid', 'patio', 'pets', 'pool', 'private', 'refrigerator', 'room-darkening', 'safety', 'self', 'shampoo', 'single', 'smoke', 'smoking', 'step-free', 'stove', 'translation', 'tv', 'washer', 'waterfront', 'well-lit', 'wheelchair', 'wide', 'wifi']


    return (
        <section className="edit-stay">


            <section className="images-area">
                <img className="grid-img-1" src="" alt="Upload Image" />
                <img className="grid-img-2" src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg" alt="" />
                <img className="grid-img-3" src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg" alt="" />
                <img className="grid-img-4" src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg" alt="" />
                <img className="grid-img-5" src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg" alt="" />
            </section>
            <section className="stay-main-details flex align-center g10">

                <label>
                    Capacity
                    <input type="text" onChange={handleChange} id="capacity" name="capacity" value={stayToEdit.capacity} />
                </label>

                <label>
                    Name
                    <input type="text" onChange={handleChange} id="name" name="name" value={stayToEdit.name} />
                </label>

                <label>
                    stay type:
                    <select onChange={handleSelect} name="roomType" id="roomType">
                        <option value="Entire place">Entire place</option>
                        <option value="Private room">Private room</option>
                        <option value="Shared room">Shared room</option>
                    </select>
                </label>

                <label>
                    Property type:
                    <select name="type" id="type" onChange={handleSelect}>
                        <option value="">stay</option>
                        <option value="">Apartment</option>
                        <option value="">Guest house</option>
                        <option value="">Hotel</option>
                    </select>
                </label>

                <label>
                    Price
                    <input type="number" id="price" name="price" value={stayToEdit.price} onChange={handlePrice} />
                    /night
                </label>


            </section>

            <section className="stay-edit-desc">
                <label>
                    Description
                    <textarea name="summary" id="summary" cols="30" rows="10" onChange={handleDesc} value={stayToEdit.summary}></textarea>
                </label>
            </section>

            <section className="amenities-edit-stay">

                {amenitiesList.map(ameniti => <label className="flex align-center" key={ameniti}>
                    <input type="checkbox" value={ameniti} id="amenities" name="amenities" onChange={handleLabels} />
                    <img src={require(`../../assets/img/amenities/${ameniti.split(" ").shift().toLowerCase()}.png`)} alt="" />
                    {ameniti}
                </label>)}

            </section>
            <button onClick={onSaveStay}>save</button>
        </section>
    )
}