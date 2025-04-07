import express from 'express'
import { createOrder, getOrderByUserId } from '../controllers/order.controller.js'

const router = express.Router()

router.post('/', createOrder)
router.get('/user/:user', getOrderByUserId)

export default router