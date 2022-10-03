import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication, makeDbAddAccount } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { SignUpController } from '@/presentation/controllers'
import { IController } from '@/presentation/protocols'

export const makeSignUpController = (): IController => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
