import { makeDbLoadAccountByToken } from '@/main/factories/usecases'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { IMiddleware } from '@/presentation/protocols'

export const makeAuthMiddleware = (role?: string): IMiddleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
