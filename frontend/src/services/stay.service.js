
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const API_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayMsg
}
window.cs = stayService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(API_KEY, filterBy)
}

function getById(carId) {
    return httpService.get(`stay/${carId}`)
}

async function remove(carId) {
    return httpService.delete(`stay/${carId}`)
}
async function save(car) {
    var savedCar
    if (car._id) {
        savedCar = await httpService.put(`stay/${car._id}`, car)

    } else {
        car.owner = userService.getLoggedinUser()
        savedCar = await httpService.post('stay', stay)
    }
    return savedCar
}

async function addCarMsg(carId, txt) {
    const savedMsg = await httpService.post(`stay/${carId}/msg`, {txt})
    return savedMsg
}


function getEmptyCar() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}





