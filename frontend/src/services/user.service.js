import { httpService } from './http.service';
import { socketService } from './socket.service';

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
    loginAtStart
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
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function login(userCred) {
    try {
        const user = await httpService.post('auth/login', userCred)
        if (user) {
            socketService.login(user._id)
            return saveLocalUser(user)
        }
    } catch (err) {
        console.log(err);
        throw err
    }
}

async function signup(userCred) {
    try {
        const user = await httpService.post('auth/signup', userCred)
        socketService.login(user._id)
        return saveLocalUser(user)

    } catch (err) { console.log(err); throw err }
}

async function logout() {
    try {
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        socketService.logout()
        return await httpService.post('auth/logout')

    } catch (err) { console.log(err); throw err }
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, wishList: user.wishList, isOwner: user.isOwner }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function loginAtStart() {
    const userCred = {username: 'ofeka26', password: '123'}
    try {
        const user = await httpService.post('auth/login', userCred)
        if (user) {
            socketService.login(user._id)
            return saveLocalUser(user)
        }
    } catch (err) { console.log(err); throw err }
}
