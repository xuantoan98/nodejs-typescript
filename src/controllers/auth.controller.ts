import { Request, Response, response } from 'express'
import { authService } from '../services'
import { IUser } from '~/interfaces/user.interface'
import { ApiError } from '~/utils/helper'

export const login = async (req: Request, res: Response) => {
  try {
    const payload: IUser = req.body
    const result = await authService.login(payload, res)

    return res.json(result)
  } catch (error: ErrorConstructor | any) {
    return res.json(ApiError(true, 404, error.message))
  }
}
