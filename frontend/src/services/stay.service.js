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
        "type": "stay",
        "roomType": "Entire place",
        "imgUrls": ['', '', '', '', ''],
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
                "rate": 4.52,
                "at": "2016-06-12T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fc004",
                    "fullname": "Kiesha",
                    "imgUrl": "https://robohash.org/10711825?set=set1",
                    "id": "10711825"
                },
                "txt": "I had a great experience working with Patty and Peter.  Both were very attentive in sorting out the booking details and following up directly when I had questions.  I rented a 2 bedroom unit at the Westin Villas  in Maui and both the unit and property was absolutely amazing.  I think we had the best unit on the resort complete with 2 outdoor patios with direct access  to  the  beach.  I would HIGHLY recommend renting with Patty and Peter."
            },
            {
                "rate": 4.52,
                "at": "2016-07-28T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb204",
                    "fullname": "Chris",
                    "imgUrl": "https://robohash.org/70072865?set=set1",
                    "id": "70072865"
                },
                "txt": "Peter quickly responded to any questions I had before, and during the trip. Will use again, highly recommend. "
            },
            {
                "rate": 4.52,
                "at": "2016-09-11T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb703",
                    "fullname": "Kim",
                    "imgUrl": "https://robohash.org/71179725?set=set1",
                    "id": "71179725"
                },
                "txt": "We had the perfect location for a room, first floor right in front of the pool. The resort is beautiful, and the staff is so friendly! I enjoyed it so much, we talked about buying a timeshare ourselves."
            },
            {
                "rate": 4.52,
                "at": "2017-01-07T05:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb37f",
                    "fullname": "Tracy",
                    "imgUrl": "https://robohash.org/65593239?set=set1",
                    "id": "65593239"
                },
                "txt": "Beautiful location. Patty & Peter were super helpful and easy to work with!"
            },
            {
                "rate": 4.52,
                "at": "2017-04-07T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb105",
                    "fullname": "Duyen",
                    "imgUrl": "https://robohash.org/26215688?set=set1",
                    "id": "26215688"
                },
                "txt": "Great spot for the kids and family and close to beach and everything at the resort. We will definitely be back."
            },
            {
                "rate": 4.52,
                "at": "2017-05-09T04:00:00.000Z",
                "by": {
                    "_id": "622f3402e36c59e6164fabbe",
                    "fullname": "Binh",
                    "imgUrl": "https://robohash.org/117390236?set=set1",
                    "id": "117390236"
                },
                "txt": "The unit and the Westin offer variety of amenities you can possibly ask for. Sofa beds are very comfortable to sleep in. But there is charge for ocean view upgrade. Overall, I highly recommend to book with Patty and Peter. "
            },
            {
                "rate": 4.52,
                "at": "2018-02-24T05:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb4af",
                    "fullname": "Samy",
                    "imgUrl": "https://robohash.org/15143517?set=set1",
                    "id": "15143517"
                },
                "txt": "We spent a great week at Patty and Peter's place. The place was exactly as shown in the pictures, very comfortable, nice view, with all amenities. The resort is great with several pools, a long beach, many restaurants, and of course a lot of great activities all around."
            },
            {
                "rate": 4.52,
                "at": "2018-06-16T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb87b",
                    "fullname": "Breanne",
                    "imgUrl": "https://robohash.org/78173091?set=set1",
                    "id": "78173091"
                },
                "txt": "This place was perfect for my family. We had plenty of room to spread out and the service could not have been any better"
            },
            {
                "rate": 4.52,
                "at": "2018-06-29T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb713",
                    "fullname": "Kimberly",
                    "imgUrl": "https://robohash.org/100535039?set=set1",
                    "id": "100535039"
                },
                "txt": "We love Westin Kaanapalli"
            }
        ],
        "likedByUsers": [], // for user-wishlist : use $in
        "inWishList": false
    }
    return stay
}




