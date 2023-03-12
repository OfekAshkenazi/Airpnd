const orderService = require('./order.service.js')
const logger = require('../../services/logger.service')
const socketService = require('../../services/socket.service')

module.exports = {
  getOrders,
  getOrderById,
  addOrder,
  updateOrder,
  removeOrder,
  addOrderMsg
}

async function getOrders(req, res) {
  try {
    const user = req.query
    console.log(user)
    logger.debug('Getting orders')
    const orders = await orderService.query(user)
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
    const { loggedinUser } = req
    const order = req.body
    const addedOrder = await orderService.add(order, loggedinUser)

    socketService.emitToUser({ type: 'order-coming', data: order, userId: order.hostId })

    res.json(addedOrder)
  } catch (err) {
    logger.error('Failed to add order', err)
    res.status(500).send({ err: 'Failed to add order' })
  }
}

async function updateOrder(req, res) {
  try {
    const order = req.body
    const updatedOrder = await orderService.update(order)

    socketService.emitToUser({ type: 'order-update', data: order, userId: order.byUser._id })

    res.json(updatedOrder)
  } catch (err) {
    logger.error('Failed to update order', err)
    res.status(500).send({ err: 'Failed to update order' })
  }
}

async function removeOrder(req, res) {
  try {
    const orderId = req.params.id
    const removedId = await orderService.remove(orderId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove order', err)
    res.status(500).send({ err: 'Failed to remove order' })
  }
}

async function addOrderMsg(req, res) {
  try {
    const orderId = req.params.id
    const msg = req.body
    console.log(orderId, msg)
    const savedMsg = await orderService.addOrderMsg(orderId, msg)
    res.json(savedMsg)

  } catch (err) {
    logger.error('Cannot add msg', err)
    res.status(500).send({ err: 'Cannot add msg' })
  }
}

