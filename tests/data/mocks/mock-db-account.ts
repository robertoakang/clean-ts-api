import { IAddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { ILoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { ILoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { IUpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'

import { faker } from '@faker-js/faker'
import { ICheckAccountByEmailRepository } from '../protocols'

export class AddAccountRepositorySpy implements IAddAccountRepository {
  result = true
  addAccountParams: IAddAccountRepository.Params

  async add (data: IAddAccountRepository.Params): Promise<IAddAccountRepository.Result> {
    this.addAccountParams = data
    return await Promise.resolve(this.result)
  }
}

export class LoadAccountByEmailRepositorySpy implements ILoadAccountByEmailRepository {
  email: string
  result = {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    password: faker.internet.password()
  }

  async loadByEmail (email: string): Promise<ILoadAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class CheckAccountByEmailRepositorySpy implements ICheckAccountByEmailRepository {
  email: string
  result = false

  async checkByEmail (email: string): Promise<ICheckAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class LoadAccountByTokenRepositorySpy implements ILoadAccountByTokenRepository {
  token: string
  role: string
  result = {
    id: faker.datatype.uuid()
  }

  async loadByToken (token: string, role?: string): Promise<ILoadAccountByTokenRepository.Result> {
    this.token = token
    this.role = role
    return this.result
  }
}

export class UpdateAccessTokenRepositorySpy implements IUpdateAccessTokenRepository {
  id: string
  token: string

  async updateAccessToken (id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
    return await Promise.resolve()
  }
}
