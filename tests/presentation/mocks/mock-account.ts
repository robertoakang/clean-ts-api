import { AddAccountParams, IAddAccount } from '@/domain/usecases/account/add-account'
import { IAuthentication, AuthenticationParams } from '@/domain/usecases/account/authentication'
import { ILoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { AccountModel, AuthenticationModel } from '@/domain/models'
import { mockAccountModel } from '@/../tests/domain/mocks'
import { faker } from '@faker-js/faker'

export class AddAccountSpy implements IAddAccount {
  accountModel = mockAccountModel()
  addAccountParams: AddAccountParams

  async add (account: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = account
    return await Promise.resolve(this.accountModel)
  }
}

export class AuthenticationSpy implements IAuthentication {
  authenticationParams: AuthenticationParams
  authenticationModel = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  }

  async auth (authenticationParams: AuthenticationParams): Promise<AuthenticationModel> {
    this.authenticationParams = authenticationParams
    return await Promise.resolve(this.authenticationModel)
  }
}

export class LoadAccountByTokenSpy implements ILoadAccountByToken {
  accountModel = mockAccountModel()
  accessToken: string
  role: string

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    this.accessToken = accessToken
    this.role = role
    return await Promise.resolve(this.accountModel)
  }
}
