import jwt from 'jsonwebtoken';
import  configs  from '../configs/configs.js';

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if(!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access deniend" })

  }
  try {
    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, configs.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export default authenticationMiddleware