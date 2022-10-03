import { IAddAccount, IAuthentication, AuthenticationParams, ILoadAccountByToken } from '@/domain/usecases'
import { AccountModel, AuthenticationModel } from '@/domain/models'
import { mockAccountModel } from '@/../tests/domain/mocks'
import { faker } from '@faker-js/faker'

export class AddAccountSpy implements IAddAccount {
  isValid = true
  addAccountParams: IAddAccount.Params

  async add (account: IAddAccount.Params): Promise<IAddAccount.Result> {
    this.addAccountParams = account
    return this.isValid
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
