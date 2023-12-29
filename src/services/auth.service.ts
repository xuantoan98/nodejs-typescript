import { IUser } from '~/interfaces/user.interface'
import { generateToken } from './session.service'
import { formatResponse } from '~/utils/helper'
import { Response } from 'express'

export const login = async (payload: IUser, res: Response) => {
  const user: IUser = {
    id: 1,
    userName: 'ToanKX',
    email: 'toankx@gmail.com'
  }

  if (!payload.email || payload.email !== user.email) {
    throw new Error('USER_NOT_FOUND')
  }

  const token = generateToken(user)
  res.header('Authorization', `Bearer ${token}`)

  return formatResponse(200, false, 'LOGIN_SUCCESSFULLY', { user, token })
}
