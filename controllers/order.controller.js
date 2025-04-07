import { Order } from '../models/order.model.js'
import { Product } from '../models/product.model.js'
import logger from '../utils/logger.js'

const createOrder = async (req, res) => {
  try {
    const { user, products } = req.body
    let totalPrice = 0

    // for(const item of products) {
    //   const productFromBD = await Product.findById(item.product)
    //   if(!productFromBD) res.status(404).json({
    //     message: "Product not found",
    //     success: false
    //   })
    //   totalPrice += productFromBD.price * item.quantity
    // }

    const productPromises = products.map(async(product) => {
      const productFromDB = await Product.findById(product.product)
      if(!productFromDB) res.status(404).json({
        message: "Product not found",
        success: false
      })
      totalPrice += productFromDB.price * product.quantity
    })

    await Promise.all(productPromises)

    const order = new Order({
      user: user,
      products,
      totalPrice
    })

    await order.save()
    res.status(201).json({
      message: "Order created succesfully",
      success: true
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    })
  }
}

const getOrderByUserId = async(req, res) => {
  try {
    logger.info("entra al metodo getOrderByUserId - info")
    logger.warning("entra al metodo getOrderByUserId - warn")
    logger.error("entra al metodo getOrderByUserId - error")
    const user = req.params.user
    const order = await Order.find({user}).populate("products.product").populate("comments")
    if(!order) res.status(404).json({
      message: "Order not found",
      success: false
    }) 

    res.status(200).json({
      message: "success",
      data: order,
      success: true
    })
  } catch (error) {
    logger.error(error.message)
    res.status(500).json({
      message: error.messsage,
      success: false
    })
  }
}

export {
  createOrder,
  getOrderByUserId
}