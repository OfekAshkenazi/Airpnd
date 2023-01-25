const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    add,
    update,
}


async function query() {
    try {
        const criteria = {
            "hostId._id": { $regex: "63cfe9a88276fe4e2c861da5", $options: 'i' } 
        }
        const collection = await dbService.getCollection('order')
        let orders = await collection.find(criteria).toArray()
        console.log(orders)
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

async function add(order,loggedinUser) {
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
        console.log(order)
        const orderToSave = {
            status: order.status
        }
        console.log(orderToSave)
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ _id: ObjectId(order._id) }, { $set: orderToSave })
        return orderToSave
    } catch (err) {
        logger.error(`cannot update order ${order._id}`, err)
        throw err
    }
}



