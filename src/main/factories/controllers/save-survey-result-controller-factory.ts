import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadSurveyById, makeDbSaveSurveyResult } from '@/main/factories/usecases'
import { IController } from '@/presentation/protocols'
import { SaveSurveyResultController } from '@/presentation/controllers'

export const makeSaveSurveyResultController = (): IController => {
  const controller = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
