const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addCarMsg,
    removeCarMsg
}


async function query() {
    try {
        // const criteria = {
        //     name: { $regex: filterBy.txt, $options: 'i' }
        // }
        const collection = await dbService.getCollection('stay')
        var stays = await collection.find().toArray()
        return stays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }
}

async function getById(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        const stay = collection.findOne({ _id: ObjectId(stayId) })
        return stay
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}

async function remove(carId) {
    try {
        const collection = await dbService.getCollection('car')
        await collection.deleteOne({ _id: ObjectId(carId) })
        return carId
    } catch (err) {
        logger.error(`cannot remove car ${carId}`, err)
        throw err
    }
}

async function add(car) {
    try {
        const collection = await dbService.getCollection('car')
        await collection.insertOne(car)
        return car
    } catch (err) {
        logger.error('cannot insert car', err)
        throw err
    }
}

async function update(car) {
    try {
        const carToSave = {
            vendor: car.vendor,
            price: car.price
        }
        const collection = await dbService.getCollection('car')
        await collection.updateOne({ _id: ObjectId(car._id) }, { $set: carToSave })
        return car
    } catch (err) {
        logger.error(`cannot update car ${carId}`, err)
        throw err
    }
}

async function addCarMsg(carId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('car')
        await collection.updateOne({ _id: ObjectId(carId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add car msg ${carId}`, err)
        throw err
    }
}

async function removeCarMsg(carId, msgId) {
    try {
        const collection = await dbService.getCollection('car')
        await collection.updateOne({ _id: ObjectId(carId) }, { $pull: { msgs: {id: msgId} } })
        return msgId
    } catch (err) {
        logger.error(`cannot add car msg ${carId}`, err)
        throw err
    }
}

