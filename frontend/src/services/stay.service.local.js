import { storageService } from './async-storage.service.js';
import { userService } from './user.service.js';
import { utilService } from './util.service.js';

const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    // getEmptyStay,
    getEmptyFilter
}
window.cs = stayService
_createStays()

async function query(filterBy = { txt: '', price: 0 }) {
    var stays = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stays = stays.filter(stay => regex.test(stay.type) || regex.test(stay.description))
    }
    if (filterBy.price) {
        stays = stays.filter(stay => stay.price <= filterBy.price)
    }
    return stays
}

function getEmptyFilter() {
    return { name: '' }
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
    try {
        await storageService.remove(STORAGE_KEY, stayId)
    } catch (err) {
        throw err
    }
}

async function save(stay) {
    let savedStay
    if (stay._id) {
        savedStay = await storageService.put(STORAGE_KEY, stay)
    } else {
        stay.owner = userService.getLoggedinUser()
        savedStay = await storageService.post(STORAGE_KEY, stay)
    }
    return savedStay
}

function _createStays() {
    let stays = storageService.loadFromStorage(STORAGE_KEY)
    if (!stays) {
        stays = [
            {
                "_id": "10006546",
                "name": "Ribeira Charming Duplex",
                "type": "House",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
                    "https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg",
                    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80",
                    "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31J1UA5QI_CCSR0hMi-Ekgft_zdpM6U_v9g&usqp=CAU"
                ],
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
                    "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
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
                "likedByUsers": ['mini-user'] // for user-wishlist : use $in
            },
            {
                "_id": "10006547",
                "name": "Tv. José Joaquim Ribeiro Teles",
                "type": "House",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
                    "https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg",
                    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80",
                    "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31J1UA5QI_CCSR0hMi-Ekgft_zdpM6U_v9g&usqp=CAU"
                ],
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
                    "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
                },
                "loc": {
                    "country": "Portugal",
                    "countryCode": "PT",
                    "city": "Porto",
                    "address": "17 Kombo st",
                    "lat": -8.547,
                    "lng": 41.209
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
                "likedByUsers": ['mini-user'] // for user-wishlist : use $in
            },
            {
                "_id": "10006548",
                "name": "C. de la Coalición, 17B, 28041 Madrid",
                "type": "House",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
                    "https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg",
                    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80",
                    "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31J1UA5QI_CCSR0hMi-Ekgft_zdpM6U_v9g&usqp=CAU"
                ],
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
                    "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
                },
                "loc": {
                    "country": "Madrid",
                    "countryCode": "PT",
                    "city": "Porto",
                    "address": "17 Kombo st",
                    "lat": -3.6887,
                    "lng": 40.3762
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
                "likedByUsers": ['mini-user'] // for user-wishlist : use $in
            },
            {
                "_id": "10006549",
                "name": "P. Puzino g. 19A, 35197 Panevėžys",
                "type": "House",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
                    "https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg",
                    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80",
                    "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31J1UA5QI_CCSR0hMi-Ekgft_zdpM6U_v9g&usqp=CAU"
                ],
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
                    "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
                },
                "loc": {
                    "country": "Lietuva",
                    "countryCode": "PT",
                    "city": "Porto",
                    "address": "17 Kombo st",
                    "lat": 24.3557,
                    "lng": 55.7327
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
                "likedByUsers": ['mini-user'] // for user-wishlist : use $in
            },
            {
                "_id": "10006550",
                "name": "Passagem Nacoes Unidas, 900 - Laguinho, Macapá - AP, 68908-126",
                "type": "House",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
                    "https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg",
                    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80",
                    "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31J1UA5QI_CCSR0hMi-Ekgft_zdpM6U_v9g&usqp=CAU"
                ],
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
                    "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
                },
                "loc": {
                    "country": "Brazil",
                    "countryCode": "PT",
                    "city": "Porto",
                    "address": "17 Kombo st",
                    "lat": -51.0603,
                    "lng": 0.04692
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
                "likedByUsers": ['mini-user'] // for user-wishlist : use $in
            },
            {
                "_id": "10006551",
                "name": "16 Av. de Suffren",
                "type": "House",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
                    "https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg",
                    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80",
                    "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31J1UA5QI_CCSR0hMi-Ekgft_zdpM6U_v9g&usqp=CAU"
                ],
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
                    "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
                },
                "loc": {
                    "country": "France",
                    "countryCode": "PT",
                    "city": "Porto",
                    "address": "17 Kombo st",
                    "lat": 2.2931,
                    "lng": 48.855
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
                "likedByUsers": ['mini-user'] // for user-wishlist : use $in
            },
            {
                "_id": "10006552",
                "name": "Via Sandro Penna, 59, 06132 Perugia PG",
                "type": "House",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
                    "https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg",
                    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80",
                    "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31J1UA5QI_CCSR0hMi-Ekgft_zdpM6U_v9g&usqp=CAU"
                ],
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
                    "imgUrl": "https://https://a0.muscache.com/im/pictures/user/7c6c11cb-3ca7-4618-8b49-9b00079089af.jpg?im_w=240://a0.muscache.com/im/pictures/user/7c6c11cb-3ca7-4618-8b49-9b00079089af.jpg?im_w=240.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
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
                        "rate": 4,
                        "by": {
                            "_id": "u102",
                            "fullname": "user2",
                            "imgUrl": "/img/img2.jpg"
                        }
                    }
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist : use $in
            },
            {
                "_id": "10006555",
                "name": "Via Privata Ercole Marelli, 6, 20139 Milano MI",
                "type": "House",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
                    "https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg",
                    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80",
                    "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31J1UA5QI_CCSR0hMi-Ekgft_zdpM6U_v9g&usqp=CAU"
                ],
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
                    "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
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
                        "rate": 4,
                        "by": {
                            "_id": "u102",
                            "fullname": "user2",
                            "imgUrl": "/img/img2.jpg"
                        }
                    }
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist : use $in
            },
        ]
        storageService.saveToStorage(STORAGE_KEY, stays)
        return stays
    }
    return stays
}





