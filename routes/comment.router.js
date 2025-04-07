import express from 'express'
import { createComment } from '../controllers/comment.controller.js'

const router = express.Router()

router.post("/order/:id", createComment)

export default router