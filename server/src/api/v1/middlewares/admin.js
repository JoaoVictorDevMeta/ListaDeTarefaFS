import User from "../models/User.js";

async function isAdmin(req, res, next) {
  const userId = req.userId;
  const user = await User.findById(userId);
  
  // Check if the user is an admin
  if(user.role === 'admin') {
    next();
  }

  return res.status(401).send({ auth: false, message: 'Usuário não autorizado' });
}

export { isAdmin };