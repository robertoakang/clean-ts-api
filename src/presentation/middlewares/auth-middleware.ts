import { HttpRequest, HttpResponse, Middleware } from '../protocols'
import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors'
import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const acccessToken = httpRequest.headers?.['x-acccess-token']
      if (acccessToken) {
        const account = await this.loadAccountByToken.load(acccessToken)
        if (account) return ok({ accountId: account.id })
      }

      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
