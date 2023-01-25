const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { getOrders, getOrderById, addOrder, updateOrder, removeOrder } = require('./order.controller')
const router = express.Router()

router.get('/', log, getOrders)
router.post('/', addOrder)
router.get('/:id', getOrderById)
// router.put('/:id', updateOrder)



module.exports = router