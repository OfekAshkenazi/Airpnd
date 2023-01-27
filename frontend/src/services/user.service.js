import { storageService } from './async-storage.service';
import { httpService } from './http.service';

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const API_KEY = 'user'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
}

function getUsers() {
    return httpService.get(API_KEY)
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function update(userToUpdate, userId) {
    try {
        const user = await httpService.put(API_KEY + `/${userId}`, userToUpdate)
        return user
    } catch (err) { console.log(err); throw err }
}

async function login(userCred) {
    try {
        const user = await httpService.post('auth/login', userCred)
        if (user) {
            // socketService.login(user._id)
            return saveLocalUser(user)
        }
    } catch (err) { console.log(err); throw err }
}

async function signup(userCred) {
    try {
        const user = await httpService.post('auth/signup', userCred)
        
        // const user = await storageService.post('user', userCred)
        // socketService.login(user._id)
        return saveLocalUser(user)

    } catch (err) { console.log(err); throw err }
}

async function logout() {
    try {
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        return await httpService.post('auth/logout')
        // socketService.logout()

    } catch (err) { console.log(err); throw err }
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, wishList: user.wishList }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// function _crateUsers() {
//     const users = storageService.loadFromStorage(STOARGE_KEY_USERS)
//     if (!users) {
//         ; (async () => {
//             await userService.signup({ fullname: 'User 1', username: 'puki', password: '123', "isOwner": false, wishList: ['10006546'] })
//             await userService.signup({ fullname: 'User 2', username: 'muki', password: '123', "isOwner": true, imgUrl: "../user-img/baby.jpg", wishList: ['10006546'] })
//         })()
//         return users
//     }
//     return users
// }


