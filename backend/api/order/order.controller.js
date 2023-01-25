const orderService = require('./order.service.js')

const logger = require('../../services/logger.service')


module.exports = {
  getOrders,
  getOrderById,
  addOrder,
//   updateOrder,
//   removeOrder,
}

async function getOrders(req, res) {
  try {
    logger.debug('Getting orders')
    const orders = await orderService.query()
    res.json(orders)
  } catch (err) {
    logger.error('Failed to get orders', err)
    res.status(500).send({ err: 'Failed to get orders' })
  }
}

async function getOrderById(req, res) {
  try {
    const orderId = req.params.id
    const order = await orderService.getById(orderId)
    res.json(order)
  } catch (err) {
    logger.error('Failed to get order', err)
    res.status(500).send({ err: 'Failed to get order' })
  }
}

async function addOrder(req, res) {
  try {
    const order = req.body
    const addedOrder = await orderService.add(order)
    res.json(addedOrder)
  } catch (err) {
    logger.error('Failed to add order', err)
    res.status(500).send({ err: 'Failed to add order' })
  }
}

// async function updateOrder(req, res) {
//   try {
//     const stay = req.body
//     const updatedStay = await stayService.update(stay)
//     res.json(updatedStay)
//   } catch (err) {
//     logger.error('Failed to update stay', err)
//     res.status(500).send({ err: 'Failed to update stay' })
//   }
// }

// async function removeOrder(req, res) {
//   try {
//     const stayId = req.params.id
//     const removedId = await stayService.remove(stayId)
//     res.send(removedId)
//   } catch (err) {
//     logger.error('Failed to remove stay', err)
//     res.status(500).send({ err: 'Failed to remove stay' })
//   }
// }



