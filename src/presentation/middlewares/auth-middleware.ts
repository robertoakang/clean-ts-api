import { HttpRequest, HttpResponse, Middleware } from '../protocols'
import { forbidden } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors'
import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const acccessToken = httpRequest.headers?.['x-acccess-token']
    if (acccessToken) {
      await this.loadAccountByToken.load(acccessToken)
    }

    return forbidden(new AccessDeniedError())
  }
}
