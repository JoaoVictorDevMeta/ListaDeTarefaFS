import jwt from 'jsonwebtoken';
import { JWT } from '../../../config/constants.js';

function isAuthenticated(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({ auth: false, message: 'Nenhum Token enviado' });
    }

    const [, token] = authorization.split(' ');

    const { userId } = jwt.verify(token, JWT);

    req.userId = userId;

    next();
  } catch (error) {
    //this can be useful for refresh token implementation
    //Future Objetives
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ auth: false, message: 'Token expirado' });
    }
    res.status(401).send({ auth: false, message: 'Token inválido' });
  }
}

export { isAuthenticated };