import { NextFunction, Request, RequestHandler, Response } from 'express';
import { IReadUser } from '../types/db.types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const secret = 'super_secret_key';
const expiration = '2h';

interface AuthRequest extends Request {
  user?: IReadUser;
}

type AuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => void;

export const authMiddleware: AuthMiddleware = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    // Optionally, handle no token case more explicitly, e.g., by sending an error response
    console.log('No token provided');
    return res.status(401).send('No token provided');
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration }) as jwt.JwtPayload;
    req.user = data;
    next();
  } catch {
    console.log('Invalid token');
    res.status(401).send('Invalid token');
  }
};
export const permissionsMiddleware: AuthMiddleware = (req, res, next) => {
  if (!req.user?.isAdmin || (req.params.companyId && req.params.companyId !== req.user.companyId)) {
    return res.status(403).send('Unauthorized');
  }
  next();
};
export const superPermissionsMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user?.isSuperAdmin) {
    return res.status(403).send('Unauthorized');
  }
  next();
};
export const signToken = ({
  email,
  first_name,
  last_name,
  id,
  isAdmin,
  isSuperAdmin,
  companyId,
}: IReadUser) => {
  const payload = { email, first_name, last_name, id, isAdmin, isSuperAdmin, companyId };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};
export const checkPassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};
export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};
