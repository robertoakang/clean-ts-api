
import { IController, HttpResponse } from '@/presentation/protocols'
import { forbidden, serverError, ok } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { ILoadSurveyResult, ICheckSurveyById } from '@/domain/usecases'

export class LoadSurveyResultController implements IController {
  constructor (
    private readonly checkSurveyById: ICheckSurveyById,
    private readonly loadSurveyResult: ILoadSurveyResult
  ) {}

  async handle (request: LoadSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { surveyId } = request
      const exists = await this.checkSurveyById.checkById(surveyId)
      if (!exists) return forbidden(new InvalidParamError('surveyId'))
      const surveyResult = await this.loadSurveyResult.load(surveyId, request.accountId)
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadSurveyResultController {
  export type Request = {
    surveyId: string
    accountId: string
  }
}
