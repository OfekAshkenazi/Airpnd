const { SYSTEM_USER_COLLECTION } = require('mongodb/lib/db')
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    add,
    update,
    remove,
    addOrderMsg
}

async function query(user) {
    try {
        const criteria = _buildCriteria(user)
        const collection = await dbService.getCollection('order')
        let orders = await collection.find(criteria).toArray()
        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        const order = collection.findOne({ _id: ObjectId(orderId) })
        return order
    } catch (err) {
        logger.error(`while finding stay ${orderId}`, err)
        throw err
    }
}

async function add(order, loggedinUser) {
    try {
        const collection = await dbService.getCollection('order')
        await collection.insertOne(order)
        return order
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}

async function update(order) {
    try {
        const orderToSave = {
            status: order.status,
            msgs: order.msgs
        }
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ _id: ObjectId(order._id) }, { $set: orderToSave })
        return order
    } catch (err) {
        logger.error(`cannot update order ${order._id}`, err)
        throw err
    }
}

async function remove(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        await collection.deleteOne({ _id: ObjectId(orderId) })
        return orderId
    } catch (err) {
        logger.error(`cannot remove order ${orderId}`, err)
        throw err
    }
}
function _buildCriteria(user) {
    let criteria
    if (user.isOwner === 'true') {
        criteria = {
            "hostId": { $regex: `${user._id}`, $options: 'i' }
        }
        return criteria
    } else if (user.isOwner === 'false') {
        criteria = {
            "byUser._id": { $regex: `${user._id}`, $options: 'i' }
        }
        return criteria
    }
    return criteria
}

async function addOrderMsg(orderId, msg, loggedinUser) {
    console.log('got new msg')
    try {
        const msgToSave = {
            txt: msg.txt,
            msgRead: msg.msgRead || false,
            creatAt: msg.creatAt || Date.now(),
            imgUrl: msg.imgUrl || ''
        }
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ _id: ObjectId(orderId) }, { $push: { msgs: msgToSave } })
        console.log(msgToSave)
        return msgToSave
    } catch (err) {
        logger.error('Cannot add msg to order')
        throw err
    }
}