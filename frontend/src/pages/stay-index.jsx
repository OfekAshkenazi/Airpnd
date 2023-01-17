import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, addStay, updateStay, removeStay } from '../store/stay.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stayService } from '../services/car.service.js'

export function StayIndex() {

    const stays = useSelector(storeState => storeState.stayModule.stays)

    useEffect(() => {
        loadStays()
    }, [])

    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('Car removed')            
        } catch (err) {
            showErrorMsg('Cannot remove car')
        }
    }

    async function onAddStay() {
        try {
            const savedCar = await addCar(stay)
            showSuccessMsg(`Car added (id: ${savedCar._id})`)
        } catch (err) {
            showErrorMsg('Cannot add car')
        }        
    }

    async function onUpdateCar(stay) {
        try {
            const savedCar = await updateCar(carToSave)
            showSuccessMsg(`Car updated, new price: ${savedCar.price}`)
        } catch (err) {
            showErrorMsg('Cannot update car')
        }        
    }

    function onAddToCart(car){
        console.log(`Adding ${car.vendor} to Cart`)
        addToCart(car)
        showSuccessMsg('Added to Cart')
    }

    function onAddCarMsg(car) {
        console.log(`TODO Adding msg to car`)
    }

    return (
        <div>
            <h3>Cars App</h3>
            <main>
                <button onClick={onAddStay}>Add Car ⛐</button>
                <ul className="car-list">
                    {stays.map(car =>
                        <li className="car-preview" key={car._id}>
                            <p>Price: <span>${car.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{car.owner && car.owner.fullname}</span></p>
                            <div>
                                <button onClick={() => { onRemoveCar(car._id) }}>x</button>
                                <button onClick={() => { onUpdateCar(car) }}>Edit</button>
                            </div>

                            <button onClick={() => { onAddCarMsg(car) }}>Add car msg</button>
                            <button className="buy" onClick={() => { onAddToCart(car) }}>Add to cart</button>
                        </li>)
                    }
                </ul>
            </main>
        </div>
    )
}