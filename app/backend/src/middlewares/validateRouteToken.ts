import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../database/models/User';

const { JWT_SECRET } = process.env; 

// eslint-disable-next-line max-lines-per-function, complexity
const validateRouteToken = async (
  req: Request, res: Response, next: NextFunction
  ) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    
    const decoded = jwt.verify(
      authorization, JWT_SECRET as string) as JwtPayload;

    if (!decoded || decoded.type !== 'authentication') {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const userIsValid = await User.findOne({ where: { email: decoded.email }});
    if (!userIsValid) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    next();
  } catch (error) {
    return res.status(444).json(error);
  }
};

export default validateRouteToken;