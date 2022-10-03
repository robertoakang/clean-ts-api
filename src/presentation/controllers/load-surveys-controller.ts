
import { IController, HttpResponse, HttpRequest } from '@/presentation/protocols'
import { noContent, serverError, ok } from '@/presentation/helpers'
import { ILoadSurveys } from '@/domain/usecases'

export class LoadSurveysController implements IController {
  constructor (
    private readonly loadSurveys: ILoadSurveys
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(httpRequest.accountId)
      return surveys.length ? ok(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
