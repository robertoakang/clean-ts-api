import { IAddAccount, IAuthentication } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

export const mockAddAccountParams = (): IAddAccount.Params => ({
  name: faker.name.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): IAuthentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
