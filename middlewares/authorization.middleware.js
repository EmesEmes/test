const authorizationMiddleware =(roles) => (req, res, next) => {
  if(!req.user || !req.user.role) {
    return res.status(403).json({ message: "Forbidden" });
  }

  if(!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Accese denied, invalid role" });
  }
  next();
}

export default authorizationMiddleware;