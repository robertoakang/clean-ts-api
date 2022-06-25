import { HttpResponse, HttpRequest } from './http'

export interface IMiddleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
