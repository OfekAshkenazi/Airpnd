const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    // getById,
    // add,
    // update,
}


async function query() {
    try {
        const collection = await dbService.getCollection('order')
        let orders = await collection.find().toArray()
        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}




