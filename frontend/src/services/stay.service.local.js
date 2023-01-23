import { storageService } from './async-storage.service.js';
import { userService } from './user.service.js';
const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyFilter,
    getEmptyStay
}
_createStays()

export const labels = ['vineyards', 'caves', 'tropical', 'countrySide', 'nationalParks', 'barns', 'ski', 'historicalHome', 'privateRooms', 'mansions', 'riads', 'houseBoats', 'omg', 'chefKitchens', 'boats', 'castels', 'amazingViews', 'trending', 'beachFront', 'topOfTheWorld', 'luxe', 'domes', 'lake', 'cabins', 'tinyHomes', 'amazingPools', 'islands', 'bed&breakFasts', 'design', 'offTheGrid', 'play', 'farms', 'beach', 'lakeFront', 'arctic', 'iconicCities', 'new', 'surfing', 'camping', 'treeHouses', 'campers', 'desert', 'golfing', 'earthHomes', 'aFrames', 'hanoks', 'cycladicHomes', 'ryokans', 'yurts', 'shepherdHuts', 'casasParticulares', 'minsus', 'windMills', 'towers', 'adapted', 'containers', 'creativeSpaces', 'grandPianos', 'trulli', 'dammusi', 'skiing']

async function query(filterBy) {
    if(!filterBy) filterBy = {txt: ''}
    try {
        var stays = await storageService.query(STORAGE_KEY)
        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            stays = stays.filter(stay => regex.test(stay.loc.country) || regex.test(stay.loc.city))
        }
        return stays
    } catch (err) { console.log(err); throw err }

}

function getEmptyFilter() {
    return { txt: '' }
}

async function getById(stayId) {
    try {
        const stay = await storageService.get(STORAGE_KEY, stayId)
        return stay
    } catch (err) { console.log(err); throw err }
}

async function remove(stayId) {
    try {
        await storageService.remove(STORAGE_KEY, stayId)
    } catch (err) { console.log(err); throw err }
}

async function save(stay) {
    try {
        let savedStay
        if (stay._id) {
            savedStay = await storageService.put(STORAGE_KEY, stay)
        } else {
            stay.owner = userService.getLoggedinUser()
            savedStay = await storageService.post(STORAGE_KEY, stay)
        }
        return savedStay
    } catch (err) { console.log(err); throw err }
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
            "lat": 31.85316500,
            "lng": 34.84242200
        },
        "reviews": [
            {
                "id": "madeId",
                "txt": "Very helpful hosts. Cooked traditional...",
                "rate": 4.7,
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

function _createStays() {
    let stays = storageService.loadFromStorage(STORAGE_KEY)
    if (!stays) {
        stays = [
            {
                "_id": "10006546",
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
                    "lat": 31.85316500,
                    "lng": 34.84242200
                },
                "reviews": [
                    {
                        "id": "madeId",
                        "txt": "Very helpful hosts. Cooked traditional...",
                        "rate": 4.92,
                        "by": {
                            "_id": "u102",
                            "fullname": "user2",
                            "imgUrl": "/img/img2.jpg"
                        }
                    }
                ],
                "likedByUsers": [], // for user-wishlist : use $in
                "inWishList": true,
                "openDateds": "Feb 1 - 6"
            },
            {
                "_id": "10006547",
                "name": "Tv. José Joaquim Ribeiro Teles",
                "type": "House",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80", "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31J1UA5QI_CCSR0hMi-Ekgft_zdpM6U_v9g&usqp=CAU"],
                "price": 86.00,
                "summary": "Beutiful apartment with two bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
                "capacity": 8,
                "amenities": [
                    "TV",
                    "Wifi",
                    "Kitchen",
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
                    "_id": "u105",
                    "fullname": "David Ram",
                    "imgUrl": "https://a0.muscache.com/im/pictures/user/7c6c11cb-3ca7-4618-8b49-9b00079089af.jpg?im_w=240",
                },
                "loc": {
                    "country": "Portugal",
                    "countryCode": "PT",
                    "city": "Porto",
                    "address": "17 Kombo st",
                    "lat": 31.85316500,
                    "lng": 34.84242200
                },
                "reviews": [
                    {
                        "id": "madeId",
                        "txt": "Very helpful hosts. Cooked traditional...",
                        "rate": 4.57,
                        "by": {
                            "_id": "u102",
                            "fullname": "user2",
                            "imgUrl": "/img/img2.jpg"
                        }
                    }
                ],
                "likedByUsers": [], // for user-wishlist : use $in
                "inWishList": false,
                "openDateds": "Feb 12 - 19"
            },
            {
                "_id": "10006548",
                "name": "C. de la Coalición, 17B, 28041 Madrid",
                "type": "House",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80", "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31J1UA5QI_CCSR0hMi-Ekgft_zdpM6U_v9g&usqp=CAU"],
                "price": 97.00,
                "summary": "Beutiful apartment with two bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
                "capacity": 8,
                "amenities": [
                    "TV",
                    "Wifi",
                    "Kitchen",
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
                    "_id": "u103",
                    "fullname": "Dan Ran",
                    "imgUrl": "https://a0.muscache.com/im/pictures/user/7c6c11cb-3ca7-4618-8b49-9b00079089af.jpg?im_w=240",
                },
                "loc": {
                    "country": "Madrid",
                    "countryCode": "PT",
                    "city": "Porto",
                    "address": "17 Kombo st",
                    "lat": 31.85316500,
                    "lng": 34.84242200
                },
                "reviews": [
                    {
                        "id": "madeId",
                        "txt": "Very helpful hosts. Cooked traditional...",
                        "rate": 4.62,
                        "by": {
                            "_id": "u102",
                            "fullname": "user2",
                            "imgUrl": "/img/img2.jpg"
                        }
                    }
                ],
                "likedByUsers": [], // for user-wishlist : use $in
                "inWishList": false,
                "openDateds": "June 12 - 19"
            },
            {
                "_id": "10006549",
                "name": "P. Puzino g. 19A, 35197 Panevėžys",
                "type": "House",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80", "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31J1UA5QI_CCSR0hMi-Ekgft_zdpM6U_v9g&usqp=CAU"],
                "price": 160.00,
                "summary": "Beutiful apartment with two bedrooms, located in the historic area of Panevėžys, Ribeira (Cube)...",
                "capacity": 8,
                "amenities": [
                    "TV",
                    "Wifi",
                    "Kitchen",
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
                    "_id": "u102",
                    "fullname": "Ofek Raniel",
                    "imgUrl": "https://a0.muscache.com/im/pictures/user/7c6c11cb-3ca7-4618-8b49-9b00079089af.jpg?im_w=240",
                },
                "loc": {
                    "country": "Lietuva",
                    "countryCode": "PT",
                    "city": "Porto",
                    "address": "17 Kombo st",
                    "lat": 31.85316500,
                    "lng": 34.84242200
                },
                "reviews": [
                    {
                        "id": "madeId",
                        "txt": "Very helpful hosts. Cooked traditional...",
                        "rate": 4.67,
                        "by": {
                            "_id": "u102",
                            "fullname": "user2",
                            "imgUrl": "/img/img2.jpg"
                        }
                    }
                ],
                "likedByUsers": [], // for user-wishlist : use $in
                "openDateds": "July 12 - 19",
                "inWishList": false,
            },
            {
                "_id": "10006550",
                "name": "Passagem Nacoes Unidas, 900 - Laguinho, Macapá - AP, 68908-126",
                "type": "House",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80", "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31J1UA5QI_CCSR0hMi-Ekgft_zdpM6U_v9g&usqp=CAU"],
                "price": 55.00,
                "summary": "Beutiful apartment with two bedrooms, located in the historic area of Brazil, Ribeira (Cube)...",
                "capacity": 8,
                "amenities": [
                    "TV",
                    "Wifi",
                    "Kitchen",
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
                    "_id": "u102",
                    "fullname": "Rom Bram",
                    "imgUrl": "https://a0.muscache.com/im/pictures/user/7c6c11cb-3ca7-4618-8b49-9b00079089af.jpg?im_w=240",
                },
                "loc": {
                    "country": "Brazil",
                    "countryCode": "PT",
                    "city": "Porto",
                    "address": "17 Kombo st",
                    "lat": 31.85316500,
                    "lng": 34.84242200
                },
                "reviews": [
                    {
                        "id": "madeId",
                        "txt": "Very helpful hosts. Cooked traditional...",
                        "rate": 4.83,
                        "by": {
                            "_id": "u102",
                            "fullname": "user2",
                            "imgUrl": "/img/img2.jpg"
                        }
                    }
                ],
                "likedByUsers": [], // for user-wishlist : use $in
                "inWishList": false,
                "openDateds": "July 1 - 6",
            },
            {
                "_id": "10006551",
                "name": "16 Av. de Suffren",
                "type": "House",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80", "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31J1UA5QI_CCSR0hMi-Ekgft_zdpM6U_v9g&usqp=CAU"],
                "price": 1100.00,
                "summary": "Beutiful apartment with two bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
                "capacity": 8,
                "amenities": [
                    "TV",
                    "Wifi",
                    "Kitchen",
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
                    "_id": "u102",
                    "fullname": "Daniel Ram",
                    "imgUrl": "https://a0.muscache.com/im/pictures/user/7c6c11cb-3ca7-4618-8b49-9b00079089af.jpg?im_w=240",
                },
                "loc": {
                    "country": "France",
                    "countryCode": "PT",
                    "city": "Porto",
                    "address": "17 Kombo st",
                    "lat": 31.85316500,
                    "lng": 34.84242200
                },
                "reviews": [
                    {
                        "id": "madeId",
                        "txt": "Very helpful hosts. Cooked traditional...",
                        "rate": 4.91,
                        "by": {
                            "_id": "u102",
                            "fullname": "user2",
                            "imgUrl": "/img/img2.jpg"
                        }
                    }
                ],
                "likedByUsers": [], // for user-wishlist : use $in
                "inWishList": false,
                "openDateds": "April 1 - 1",
            },
            {
                "_id": "10006552",
                "name": "Via Sandro Penna, 59, 06132 Perugia PG",
                "type": "House",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80", "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31J1UA5QI_CCSR0hMi-Ekgft_zdpM6U_v9g&usqp=CAU"],
                "summary": "Beutiful apartment with two bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
                "capacity": 8,
                "amenities": [
                    "TV",
                    "Wifi",
                    "Kitchen",
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
                    "_id": "u103",
                    "fullname": "Ronel Gariel",
                    "imgUrl": "https://a0.muscache.com/im/pictures/user/7c6c11cb-3ca7-4618-8b49-9b00079089af.jpg?im_w=240",
                },
                "loc": {
                    "country": "Italy",
                    "countryCode": "PT",
                    "city": "Porto",
                    "address": "17 Kombo st",
                    "lat": 12.3354,
                    "lng": 43.07556
                },
                "reviews": [
                    {
                        "id": "madeId",
                        "txt": "Very helpful hosts. Cooked traditional...",
                        "rate": 4.99,
                        "by": {
                            "_id": "u102",
                            "fullname": "user2",
                            "imgUrl": "/img/img2.jpg"
                        }
                    }
                ],
                "likedByUsers": [], // for user-wishlist : use $in
                "inWishList": false,
                "openDateds": "April 8 - 12",
            },
            {
                "_id": "1000654888",
                "name": "Via Privata Ercole Marelli, 6, 20139 Milano MI",
                "type": "House",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80", "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31J1UA5QI_CCSR0hMi-Ekgft_zdpM6U_v9g&usqp=CAU"],
                "summary": "Beutiful apartment with two bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
                "capacity": 8,
                "amenities": [
                    "TV",
                    "Wifi",
                    "Kitchen",
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
                    "_id": "u103",
                    "fullname": "David Bell",
                    "imgUrl": "https://a0.muscache.com/im/pictures/user/7c6c11cb-3ca7-4618-8b49-9b00079089af.jpg?im_w=240",
                },
                "loc": {
                    "country": "Italy",
                    "countryCode": "PT",
                    "city": "Porto",
                    "address": "17 Kombo st",
                    "lat": 9.2006,
                    "lng": 45.44269
                },
                "reviews": [
                    {
                        "id": "madeId",
                        "txt": "Very helpful hosts. Cooked traditional...",
                        "rate": 4.51,
                        "by": {
                            "_id": "u102",
                            "fullname": "user2",
                            "imgUrl": "/img/img2.jpg"
                        }
                    }
                ],
                "likedByUsers": [], // for user-wishlist : use $in
                "inWishList": false,
                "openDateds": "March 8 - 24",
            },
        ]
        storageService.saveToStorage(STORAGE_KEY, stays)
        return stays
    }
    return stays
}