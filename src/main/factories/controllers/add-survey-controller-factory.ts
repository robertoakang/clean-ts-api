import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbAddSurvey } from '@/main/factories/usecases'
import { IController } from '@/presentation/protocols'
import { AddSurveyController } from '@/presentation/controllers'

export const makeAddSurveyController = (): IController => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(controller)
}
