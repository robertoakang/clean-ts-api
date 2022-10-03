import { IMiddleware, HttpResponse, HttpRequest } from '@/presentation/protocols'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { ILoadAccountByToken } from '@/domain/usecases'

export class AuthMiddleware implements IMiddleware {
  constructor (
    private readonly loadAccountByToken: ILoadAccountByToken,
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
