import { Comment } from "../models/comment.model.js";
import { Order } from "../models/order.model.js";

const createComment = async(req,res) => {
  try {
    const { user, comment } = req.body
    const commentToSave = new Comment({
      user,
      comment
    })

    const commentForOrder = await commentToSave.save()

    const orderId = req.params.id
    
    const order = await Order.findById(orderId)
    order.comments.push(commentForOrder._id)

    await order.save()
    res.status(201).json({
      data: order,
      message: "Comment created succesfully",
      success: true
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    })
  }
}

export {
  createComment
}