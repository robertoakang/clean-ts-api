import { HttpResponse, HttpRequest, IController, IAddAccount, IValidation, IAuthentication } from './signup-controller-protocols'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { EmailInUseError } from '@/presentation/errors'

export class SignUpController implements IController {
  constructor (
    private readonly addAccount: IAddAccount,
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.add({ name, email, password })
      if (!account) return forbidden(new EmailInUseError())

      const accessToken = await this.authentication.auth({ email, password })
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
