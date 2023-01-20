import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STOARGE_KEY_USERS = "user"
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
    addToWishList
}
_crateUsers()
function getUsers() {
    return storageService.query('user')
    // return httpService.get(`user`)
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update({ _id }) {
    try {
        const user = await storageService.get('user', _id)
        await storageService.put('user', user)
        if (getLoggedinUser()._id === user._id) saveLocalUser(user)
        return user

    } catch (err) { console.log(err); throw err }
    // const user = await httpService.put(`user/${_id}`, {_id, score})
}

async function login(userCred) {
    try {
        // const user = await httpService.post('auth/login', userCred)
        const users = await storageService.query('user')
        const user = users.find(user => user.username === userCred.username)
        if (user) {
            // socketService.login(user._id)
            return saveLocalUser(user)
        }
    } catch (err) { console.log(err); throw err }
}
async function signup(userCred) {
    try {
        // const user = await httpService.post('auth/signup', userCred)
        if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
        const user = await storageService.post('user', userCred)
        // socketService.login(user._id)
        return saveLocalUser(user)

    } catch (err) { console.log(err); throw err }
}
async function logout() {
    try {
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        // return await httpService.post('auth/logout')
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
async function addToWishList(stayId) {

}
function _crateUsers() {
    const users = storageService.loadFromStorage(STOARGE_KEY_USERS)
    if (!users) {
        ; (async () => {
            await userService.signup({ fullname: 'User 1', username: 'puki', password: '123', "isOwner": false, wishList: ['10006546'] })
            await userService.signup({ fullname: 'User 2', username: 'muki', password: '123', "isOwner": true })
        })()
        return users
    }
    return users
}


// 4SyfY userId
