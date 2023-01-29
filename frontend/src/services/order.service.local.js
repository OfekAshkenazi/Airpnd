import { addDays } from 'date-fns';

import { showSuccessMsg } from '../services/event-bus.service.js';
import { loadOrders } from '../store/order.action.js';
import { storageService } from './async-storage.service';
import { httpService } from './http.service';
import { SOCKET_EVENT_ORDER_FOR_HOST, socketService, SOCKET_EVENT_ORDER_FOR_USER } from './socket.service';
import { userService } from './user.service';


(() => {
    socketService.on(SOCKET_EVENT_ORDER_FOR_USER, (order) => {
        loadOrders()
        showSuccessMsg(`Your order was ${order.status}`)

    })
    socketService.on(SOCKET_EVENT_ORDER_FOR_HOST, (order) => {
        showSuccessMsg(`Order recived`)
    })
})()




export const orderService = {
    query,
    remove,
    add,
    getEmptyOrder,
    update,
    getById
}

// const ORDER_KEY = 'order'

async function query() {
    try {
        const user = userService.getLoggedinUser()
        console.log(user)
        const orders = await httpService.get('order', user)
        return orders
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const order = await httpService.get('order' + `/${orderId}`)
        return order
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function remove(orderId) {
    try {
        await httpService.remove('order', orderId)
    } catch (err) { console.log(err); throw err }
}

async function add(order) {
    try {
        const addedOrder = await httpService.post('order', order)
        return addedOrder

    } catch (err) {
        console.log(err)
        throw err
    }
}

async function update(order) {
    let savedOrder
    if (order._id) {
        savedOrder = await httpService.put(`order/${order._id}`, order)

    } else {
        savedOrder = await httpService.post('order', order)
    }
    return savedOrder
}

function getEmptyOrder() {
    const newOrder = {
        "hostId": "",
        "totalPrice": '',
        "startDate": new Date(),
        "endDate": addDays(new Date(), 6),
        "guests": {
            "adults": 1,
            "children": 0,
            "infants": 0,
            "pets": 0,
        },
        "stay": {
            "_id": '',
            "name": '',
            "price": ''
        },
        "msgs": [],
        "status": "pending",
        'key': 'selection'
    }
    return newOrder
}



function _createOrders() {
    let orders = storageService.loadFromStorage('order')
    if (!orders) {
        orders =
            [
                {
                    "_id": "o1225",
                    "hostId": "u102",
                    "buyer": {
                        "_id": "u101",
                        "fullname": "User 1"
                    },
                    "totalPrice": 160,
                    "startDate": "2025/10/15",
                    "endDate": "2025/10/17",
                    "guests": {
                        "adults": 2,
                        "kids": 1
                    },
                    "stay": {
                        "_id": "h102",
                        "name": "House Of Uncle My",
                        "price": 80.00
                    },
                    "msgs": [],
                    "status": "pending"
                },
                {
                    "_id": "o12266",
                    "hostId": "u302",
                    "buyer": {
                        "_id": "u301",
                        "fullname": "User 2"
                    },
                    "totalPrice": 160,
                    "startDate": "2025/10/15",
                    "endDate": "2025/10/17",
                    "guests": {
                        "adults": 2,
                        "kids": 1
                    },
                    "stay": {
                        "_id": "h102",
                        "name": "House Of Uncle My",
                        "price": 80.00
                    },
                    "msgs": [],
                    "status": "approve"
                },

            ]
        storageService.saveToStorage('order', orders)
        return orders
    }
    return orders
}
