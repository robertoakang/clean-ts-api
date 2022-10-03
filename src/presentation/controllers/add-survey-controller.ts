import { IController, HttpResponse, IValidation, HttpRequest } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers'
import { IAddSurvey } from '@/domain/usecases'

export class AddSurveyController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly addSurvey: IAddSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { question, answers } = httpRequest.body
      await this.addSurvey.add({
        question,
        answers,
        date: new Date()
      })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
