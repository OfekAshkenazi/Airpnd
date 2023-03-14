import { httpService } from './http.service.js';
import { userService } from './user.service.js';

const API_KEY = 'stay'

export const labels = ['Vineyards', 'Caves', 'Tropical', 'Countryside', 'National parks', 'Barns', 'Ski', 'Historical homes', 'Private rooms', 'Mansions', 'Riads', 'Houseboats', 'OMG', 'ChefKitchens', 'Boats', 'Castles', 'Amazing views', 'Trending', 'Beachfront', 'Top of the world', 'Luxe', 'Domes', 'Lake', 'Cabins', 'Tiny homes', 'Amazing pools', 'Islands', 'Bed & breakfasts', 'Design', 'Off-the-grid', 'Play', 'Farms', 'Beach', 'Lakefront', 'Arctic', 'Iconic cities', 'New', 'Surfing', 'Camping', 'Treehouses', 'Campers', 'Desert', 'Golfing', 'Earth homes', 'A-frames', 'Hanoks', 'Cycladic homes', 'Ryokans', 'Yurts', 'Shepherds huts', 'Casas particulares', 'Minsus', 'Windmills', 'Towers', 'Adapted', 'Containers', 'Creative spaces', 'Grand pianos', 'Trulli', 'Dammusi', 'Skiing']

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    getEmptyFilter,
    getFilterFromSearchParams,
    extractDate,
    getDayDifference
}

function getDayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return dayDiff
  }

function extractDate(dateString) {
    const date = new Date(dateString)
    return date.toDateString().slice(0, 11)
}

async function query(filterBy) {
    let stays
    let queryParams = `?txt=${filterBy.txt}&type=${filterBy.label}&userId=${filterBy.userId}&hostId=${filterBy.hostId}`
    try {
        stays = await httpService.get(API_KEY + queryParams)
        return stays
    } catch (err) {
        console.log(err)
    }
}

function getFilterFromSearchParams(searchParams) {
    const emptyFilter = getEmptyFilter()
    const filterBy = {}
    for (const field in emptyFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

function getEmptyFilter() {
    return { txt: '', label: '', userId: '', hostId: '' }
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
        "roomType": '',
        "imgUrls": [],
        "price": 0,
        "summary": "",
        "capacity": '0',
        "amenities": [
          
        ],
        "labels": [
            "Top of the world",
            "Trending",
            "Play",
            "Tropical"
        ],
        "host": {
        },
        "loc": {
            "country": "Isreal",
            "countryCode": "il",
            "city": "Tel-Aviv",
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




