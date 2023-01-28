const stayService = require('./stay.service.js')

const logger = require('../../services/logger.service')

module.exports = {
  getStays,
  getStayById,
  addStay,
  updateStay,
  removeStay,
}

async function getStays(req, res) {
  try {
    logger.debug('Getting Stays')
    const filterBy = req.query
    const stays = await stayService.query(filterBy)
    res.json(stays)
  } catch (err) {
    logger.error('Failed to get stays', err)
    res.status(500).send({ err: 'Failed to get stays' })
  }
}

async function getStayById(req, res) {
  try {
    const stayId = req.params.id
    const stay = await stayService.getById(stayId)
    res.json(stay)
  } catch (err) {
    logger.error('Failed to get stay', err)
    res.status(500).send({ err: 'Failed to get stay' })
  }
}

async function addStay(req, res) {
  const { loggedinUser } = req
  try {
    const stay = req.body
    stay.owner = loggedinUser
    const addedStay = await stayService.add(stay)
    res.json(addedStay)
  } catch (err) {
    logger.error('Failed to add stay', err)
    res.status(500).send({ err: 'Failed to add stay' })
  }
}

async function updateStay(req, res) {
  try {
    const stay = req.body
    const updatedStay = await stayService.update(stay)
    res.json(updatedStay)
  } catch (err) {
    logger.error('Failed to update stay', err)
    res.status(500).send({ err: 'Failed to update stay' })
  }
}

async function removeStay(req, res) {
  try {
    const stayId = req.params.id
    const removedId = await stayService.remove(stayId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove stay', err)
    res.status(500).send({ err: 'Failed to remove stay' })
  }
}



