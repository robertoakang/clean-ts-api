import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbCheckSurveyById, makeDbLoadSurveyResult } from '@/main/factories/usecases'
import { IController } from '@/presentation/protocols'
import { LoadSurveyResultController } from '@/presentation/controllers'

export const makeLoadSurveyResultController = (): IController => {
  const controller = new LoadSurveyResultController(makeDbCheckSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(controller)
}
