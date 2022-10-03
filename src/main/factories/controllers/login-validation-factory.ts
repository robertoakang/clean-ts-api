import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '@/validation/validators'
import { IValidation } from '@/presentation/protocols/validation'
import { EmailValidatorAdapter } from '@/infra/validators'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
