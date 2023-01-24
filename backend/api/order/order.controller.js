const orderService = require('./order.service.js')

const logger = require('../../services/logger.service')


module.exports = {
  getOrders,
//   getOrderById,
//   addOrder,
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

// async function getOrderById(req, res) {
//   try {
//     const stayId = req.params.id
//     const stay = await stayService.getById(stayId)
//     res.json(stay)
//   } catch (err) {
//     logger.error('Failed to get stay', err)
//     res.status(500).send({ err: 'Failed to get stay' })
//   }
// }

// async function addOrder(req, res) {
//   const { loggedinUser } = req
//   try {
//     const stay = req.body
//     stay.owner = loggedinUser
//     const addedStay = await stayService.add(stay)
//     res.json(addedStay)
//   } catch (err) {
//     logger.error('Failed to add stay', err)
//     res.status(500).send({ err: 'Failed to add stay' })
//   }
// }

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



