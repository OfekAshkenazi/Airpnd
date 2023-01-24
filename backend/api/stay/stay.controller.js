const stayService = require('./stay.service.js')

const logger = require('../../services/logger.service')


module.exports = {
  getStays,
  getStayById,
  addCar,
  updateCar,
  removeCar,
  addCarMsg,
  removeCarMsg
}

async function getStays(req, res) {
  try {
    logger.debug('Getting Stays')
    // const filterBy = {
    //   txt: req.query.txt || ''
    // }
    const stays = await stayService.query()
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
    console.log(stay)
    res.json(stay)
  } catch (err) {
    logger.error('Failed to get stay', err)
    res.status(500).send({ err: 'Failed to get stay' })
  }
}

async function addCar(req, res) {
  const { loggedinUser } = req

  try {
    const car = req.body
    car.owner = loggedinUser
    const addedCar = await carService.add(car)
    res.json(addedCar)
  } catch (err) {
    logger.error('Failed to add car', err)
    res.status(500).send({ err: 'Failed to add car' })
  }
}

async function updateCar(req, res) {
  try {
    const car = req.body
    const updatedCar = await carService.update(car)
    res.json(updatedCar)
  } catch (err) {
    logger.error('Failed to update car', err)
    res.status(500).send({ err: 'Failed to update car' })

  }
}

async function removeCar(req, res) {
  try {
    const carId = req.params.id
    const removedId = await carService.remove(carId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove car', err)
    res.status(500).send({ err: 'Failed to remove car' })
  }
}

async function addCarMsg(req, res) {
  const { loggedinUser } = req
  try {
    const carId = req.params.id
    const msg = {
      txt: req.body.txt,
      by: loggedinUser
    }
    const savedMsg = await carService.addCarMsg(carId, msg)
    res.json(savedMsg)
  } catch (err) {
    logger.error('Failed to update car', err)
    res.status(500).send({ err: 'Failed to update car' })

  }
}

async function removeCarMsg(req, res) {
  const { loggedinUser } = req
  try {
    const carId = req.params.id
    const { msgId } = req.params

    const removedId = await carService.removeCarMsg(carId, msgId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove car msg', err)
    res.status(500).send({ err: 'Failed to remove car msg' })

  }
}


