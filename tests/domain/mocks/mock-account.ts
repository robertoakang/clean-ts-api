import { AccountModel } from '@/domain/models'
import { IAddAccount, AuthenticationParams } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

export const mockAddAccountParams = (): IAddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
