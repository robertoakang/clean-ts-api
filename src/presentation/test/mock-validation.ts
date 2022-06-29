import { IValidation } from '@/presentation/protocols'

export const mockValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null as any
    }
  }

  return new ValidationStub()
}
