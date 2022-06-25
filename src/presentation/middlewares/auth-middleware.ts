import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/errors'
import { HttpRequest, HttpResponse, Middleware, LoadAccountByToken } from './auth-middleware-protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const acccessToken = httpRequest.headers?.['x-access-token']
      if (acccessToken) {
        const account = await this.loadAccountByToken.load(acccessToken, this.role)
        if (account) return ok({ accountId: account.id })
      }

      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
