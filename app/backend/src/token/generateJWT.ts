import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env; 

type JwtReturn = {
  id?: number;
  type?: string;
  name?: string;
  email?: string;
  role?: string;
  active?: boolean;
}

export default class Token {
  static createToken(data: object): string {
    return jwt.sign(
      { ...data },
      JWT_SECRET as jwt.Secret, { expiresIn: '1d'});
  }

  static validateToken(token: string): JwtReturn{
    try {
      const decoded = jwt.verify(token, JWT_SECRET as string);
      return decoded as JwtReturn;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
