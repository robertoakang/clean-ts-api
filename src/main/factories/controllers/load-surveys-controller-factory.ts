import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadSurveys } from '@/main/factories/usecases'
import { IController } from '@/presentation/protocols'
import { LoadSurveysController } from '@/presentation/controllers'

export const makeLoadSurveysController = (): IController => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
}
