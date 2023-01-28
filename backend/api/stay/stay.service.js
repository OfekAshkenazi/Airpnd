const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('stay')
        var stays = await collection.find(criteria).toArray()
        return stays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    let criteria = {
        $or: [
            { "loc.country": { $regex: filterBy.txt, $options: 'i' } },
            { "loc.city": { $regex: filterBy.txt, $options: 'i' } }
        ],
        type: { $regex: filterBy.type, $options: 'i' }    
    }
    if(filterBy.userId.length > 4) {
        criteria = {
            $or: [
                { "loc.country": { $regex: filterBy.txt, $options: 'i' } },
                { "loc.city": { $regex: filterBy.txt, $options: 'i' } }
            ],
            type: { $regex: filterBy.type, $options: 'i' },  
            "likedByUsers": { $regex: `${filterBy.userId}`, $options: 'i' } 
        } 
    } else if (filterBy.hostId.length > 4) {
        criteria = {
            $or: [
                { "loc.country": { $regex: filterBy.txt, $options: 'i' } },
                { "loc.city": { $regex: filterBy.txt, $options: 'i' } }
            ],
            type: { $regex: filterBy.type, $options: 'i' },  
            "hostId": { $regex: `${filterBy.hostId}`, $options: 'i' } 
        } 
    }
   
    return criteria
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

async function remove(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.deleteOne({ _id: ObjectId(stayId) })
        return stayId
    } catch (err) {
        logger.error(`cannot remove car ${stayId}`, err)
        throw err
    }
}

async function add(stay) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.insertOne(stay)
        return car
    } catch (err) {
        logger.error('cannot insert car', err)
        throw err
    }
}

async function update(stay) {
    try {
        const stayToSave = {
            likedByUsers: stay.likedByUsers
        }
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: ObjectId(stay._id) }, { $set: stayToSave })
        return stay
    } catch (err) {
        logger.error(`cannot update stay ${stay._id}`, err)
        throw err
    }
}

