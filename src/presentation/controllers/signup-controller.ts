import { IController, HttpResponse, IValidation } from '@/presentation/protocols'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers'
import { EmailInUseError } from '@/presentation/errors'
import { IAddAccount, IAuthentication } from '@/domain/usecases'

export class SignUpController implements IController {
  constructor (
    private readonly addAccount: IAddAccount,
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) return badRequest(error)

      const { name, email, password } = request
      const isValid = await this.addAccount.add({ name, email, password })
      if (!isValid) return forbidden(new EmailInUseError())

      const authenticationModel = await this.authentication.auth({ email, password })
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}
