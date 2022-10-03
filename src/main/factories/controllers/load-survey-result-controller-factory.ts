import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadSurveyById, makeDbLoadSurveyResult } from '@/main/factories/usecases'
import { IController } from '@/presentation/protocols'
import { LoadSurveyResultController } from '@/presentation/controllers'

export const makeLoadSurveyResultController = (): IController => {
  const controller = new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(controller)
}
