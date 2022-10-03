import env from '@/main/config/env'
import { ILoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { DbLoadAccountByToken } from '@/data/usecases'
import { JwtAdapter } from '@/infra/criptography'
import { AccountMongoRepository } from '@/infra/db'

export const makeDbLoadAccountByToken = (): ILoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
