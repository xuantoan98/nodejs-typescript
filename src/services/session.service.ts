import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { IUser } from '~/interfaces/user.interface'

const secretKey: string = 'typescript2023'

export const generateToken = (payload: IUser) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: '1d' })
  return {
    access: {
      token: token
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Token not provided' })
  }
  try {
    // eslint-disable-next-line prettier/prettier
    const decoded = jwt.verify(token, secretKey);
    // eslint-disable-next-line prettier/prettier
    (req as any).user = decoded
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Forbidden - Invalid token' })
  }
}
