import express from 'express'
import { saveUser, getAllUsers, updateUser, deleteUser } from '../controllers/user.controller.js';
import authenticationMiddleware from '../middlewares/authentication.middleware.js';
import authorizationMiddleware from '../middlewares/authorization.middleware.js';


const router = express.Router();

router.use(authenticationMiddleware)
router.post("/", saveUser)
router.get("/", authorizationMiddleware(["admin"]), getAllUsers)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

export default router