import { httpService } from './http.service.js';
import { userService } from './user.service.js';

const API_KEY = 'stay'

export const labels = ['Vineyards', 'Caves', 'Tropical', 'Countryside', 'National parks', 'Barns', 'Ski', 'Historical homes', 'Private rooms', 'Mansions', 'Riads', 'Houseboats', 'OMG', 'ChefKitchens', 'Boats', 'Castels', 'Amazing views', 'Trending', 'Beachfront', 'Top of the world', 'Luxe', 'Domes', 'Lake', 'Cabins', 'Tiny homes', 'Amazing pools', 'Islands', 'Bed & breakfasts', 'Design', 'Off-the-grid', 'Play', 'Farms', 'Beach', 'Lakefront', 'Arctic', 'Iconic cities', 'New', 'Surfing', 'Camping', 'Treehouses', 'Campers', 'Desert', 'Golfing', 'Earth homes', 'A-frames', 'Hanoks', 'Cycladic homes', 'Ryokans', 'Yurts', 'Shepherds huts', 'Casas particulares', 'Minsus', 'Windmills', 'Towers', 'Adapted', 'Containers', 'Creative spaces', 'Grand pianos', 'Trulli', 'Dammusi', 'Skiing']

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    getEmptyFilter,
    getFilterFromSearchParams
}

async function query(filterBy = { txt: '' }) {
    let stays
    let queryParams = `?txt=${filterBy.txt}`
    try {
        stays = await httpService.get(API_KEY + queryParams)
        return stays
    } catch (err) {
        console.log(err)
    }
}
// &type=${filterBy.type}
// let queryParams = `?name=${filterBy.name}&inStock=${filterBy.inStock}`
function getFilterFromSearchParams(searchParams) {
    const emptyFilter = getEmptyFilter()
    const filterBy = {}
    for (const field in emptyFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

function getEmptyFilter() {
    return { txt: '' }
}

async function getById(stayId) {
    try {
        const stay = await httpService.get(API_KEY + `/${stayId}`)
        return stay
    } catch (err) { console.log(err) }
}

async function remove(stayId) {
    return httpService.delete(`stay/${stayId}`)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await httpService.put(`stay/${stay._id}`, stay)

    } else {
        stay.owner = userService.getLoggedinUser()
        savedStay = await httpService.post('stay', stay)
    }
    return savedStay
}

function getEmptyStay() {
    const stay = {
        "name": "Ribeira Charming Duplex",
        "type": "House",
        "imgUrls": ["https://a0.muscache.com/im/pictures/f987e19d-2688-4390-a67b-e4e03c8fd592.jpg?im_w=720", "https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80", "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31J1UA5QI_CCSR0hMi-Ekgft_zdpM6U_v9g&usqp=CAU"],
        "price": 80.00,
        "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
        "capacity": 8,
        "amenities": [
            "TV",
            "Wifi",
            "Kitchen",
            "Smoking allowed",
            "Pets allowed",
            "Cooking basics"
        ],
        "labels": [
            "Top of the world",
            "Trending",
            "Play",
            "Tropical"
        ],
        "host": {
            "_id": "u101",
            "fullname": "Davit Pok",
            "imgUrl": "https://a0.muscache.com/im/pictures/user/7c6c11cb-3ca7-4618-8b49-9b00079089af.jpg?im_w=240",
        },
        "loc": {
            "country": "Portugal",
            "countryCode": "PT",
            "city": "Porto",
            "address": "17 Kombo st",
            "lat": -8.61308,
            "lng": 41.1413
        },
        "reviews": [
            {
                "id": "madeId",
                "txt": "Very helpful hosts. Cooked traditional...",
                "rate": 4,
                "by": {
                    "_id": "u102",
                    "fullname": "user2",
                    "imgUrl": "/img/img2.jpg"
                }
            }
        ],
        "likedByUsers": [], // for user-wishlist : use $in
        "inWishList": false
    }
    return stay
}




