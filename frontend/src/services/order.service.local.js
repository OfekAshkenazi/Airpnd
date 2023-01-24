import { storageService } from "./async-storage.service"
import { userService } from "./user.service"
import { utilService } from "./util.service"

const ORDER_KEY = 'ORDER_KEY'

export const orderService = {
    query,
    remove,
    add,
    getEmptyOrder
}
_createOrders()

function query() {
    return storageService.query(ORDER_KEY)
}

async function remove(orderId) {
    await storageService.remove(ORDER_KEY, orderId)
}

async function add(order) {
    // for real jsut send also the userID
    // const aboutUser = await userService.getById(aboutUserId)
    // const orderToAdd = {
    //     ...order,
    //     byUser: aboutUser
    // }
    // for demo
    const addedOrder = await storageService.post(ORDER_KEY, order)
    return addedOrder
}

function _createOrders() {
    let orders = storageService.loadFromStorage(ORDER_KEY)
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
        storageService.saveToStorage(ORDER_KEY, orders)
        return orders
    }
    return orders
}

function getEmptyOrder() {
    const newOrder = {
        // "_id": utilService.makeId(),
        "hostId": "u102",
        "buyer": {
            "_id": "u101",
            "fullname": "User 1"
        },
        "totalPrice": 160,
        "startDate": "2025/10/15",
        "endDate": "2025/10/17",
        "guests": {
            "adults": 0,
            "kids": 0,
            "infants": 0,
            "pets": 0,
        },
        "stay": {
            "_id": "h102",
            "name": "House Of Uncle My",
            "price": 80.00
        },
        "msgs": [],
        "status": "pending"
    }
    return newOrder
}