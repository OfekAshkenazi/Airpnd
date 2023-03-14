import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showErrorMsg } from "../../services/event-bus.service"
import { stayService } from "../../services/stay.service"
import { addStay } from "../../store/stay/stay.actions"
import { StayImgUploader } from "../stay-img-uploader"

export function EditStay() {
    const [stayToEdit, setStayToEdit] = useState(stayService.getEmptyStay())

    const { stayId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!stayId) return
        loadStay()
    }, [stayToEdit])

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setStayToEdit({ ...stayToEdit, [field]: value })
    }

    function handleChangeIneerLoc({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setStayToEdit((prevStay) => ({ ...prevStay, loc: { ...prevStay.loc, [field]: value } }))
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

    function onUploaded(idx, imgUrl) {
        setStayToEdit((prevStay) => {
            const updatedImgUrls = [...prevStay.imgUrls]
            updatedImgUrls[idx] = imgUrl
            const updatedStayToEdit = { ...prevStay, imgUrls: updatedImgUrls }
            return updatedStayToEdit
        })
    }


    async function onSaveStay() {
        try {
            await addStay(stayToEdit)
            setStayToEdit(prevStay => stayService.getEmptyStay())
        } catch (err) {
            showErrorMsg('Cannot add Stay')
        }
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



    const amenitiesList = ['24-hour', 'Air', 'Baby', 'Babysitter', 'Bathtub', 'Bbq', 'Beach', 'Beachfront', 'Bed', 'Breakfast', 'Building', 'Buzzerwireless', 'Cable', 'Carbon', 'Cat(s)', 'Cleaning', 'Coffee', 'Crib', 'Disabled', 'Dishes', 'Dishwasher', 'Dog(s)', 'Doorman', 'Dryer', 'Elevator', 'Essentials', 'Extra', 'Familykid', 'Fire', 'First', 'Flat', 'Free', 'Garden', 'Gym', 'Hair', 'Handheld', 'Hangers', 'Heating', 'High', 'Host', 'Hot', 'Internet', 'Iron', 'Kitchen', 'Laptop', 'Lock', 'Lockbox', 'Logo192', 'Long', 'Luggage', 'Microwave', 'Oven', 'Pack', 'Paid', 'Patio', 'Pets', 'Pool', 'Private', 'Refrigerator', 'Room-darkening', 'Safety', 'Self', 'Shampoo', 'Single', 'Smoke', 'Smoking', 'Step-free', 'Stove', 'Translation', 'Tv', 'Washer', 'Waterfront', 'Well-lit', 'Wheelchair', 'Wide', 'Wifi']


    return (
        <section className="edit-stay main-container narrow">

            <div className="name flex">
                <label className="flex g5">
                    Name:
                    <input type="text" onChange={handleChange} id="name" name="name" value={stayToEdit.name} />
                </label>
                <button onClick={onSaveStay}>save</button>
            </div>

            <div className="loc flex">

                <label className="flex">
                    Country:
                    <input type="text" onChange={handleChangeIneerLoc} id="country" name="country" value={stayToEdit.loc.country} />
                </label>

                <label className="flex">
                    City:
                    <input type="text" onChange={handleChangeIneerLoc} id="city" name="city" value={stayToEdit.loc.city} />
                </label>

                <label className="flex">
                    Address:
                    <input type="text" onChange={handleChangeIneerLoc} id="address" name="address" value={stayToEdit.loc.address} />
                </label>
            </div>

            <section className="images-area">
                {stayToEdit.imgUrls.map((imgUrl, idx) => (
                    <StayImgUploader key={idx} stayToEdit={stayToEdit} onUploaded={onUploaded} idx={idx} />
                ))}
            </section>

            <section className="stay-main-details flex ">

                <label>
                    Capacity:
                    <input type="text" onChange={handleChange} id="capacity" name="capacity" value={stayToEdit.capacity} />
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
                        <option value="stay">stay</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Guest house">Guest house</option>
                        <option value="Hotel">Hotel</option>
                    </select>
                </label>

                <label>
                    Price:
                    <input type="number" id="price" name="price" value={stayToEdit.price} onChange={handlePrice} />
                </label>


            </section>

            <section className="stay-edit-desc">
                <label>
                    Description:
                    <textarea name="summary" id="summary" cols="30" rows="10" onChange={handleDesc} value={stayToEdit.summary}></textarea>
                </label>
            </section>

            <section className="amenities-edit-stay">

                {amenitiesList.map(ameniti => <label className="flex align-center" key={ameniti}>
                    <input type="checkbox" value={ameniti} id="amenities" name="amenities" onChange={handleLabels} checked={stayToEdit.amenities.includes(ameniti) ? true : false} />
                    <img src={require(`../../assets/img/amenities/${ameniti.split(" ").shift().toLowerCase()}.png`)} alt="" />
                    {ameniti}
                </label>)}

            </section>
        </section>
    )
}