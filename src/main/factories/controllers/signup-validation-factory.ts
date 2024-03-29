import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation, EmailValidation } from '@/validation/validators'
import { IValidation } from '@/presentation/protocols/validation'
import { EmailValidatorAdapter } from '@/infra/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
