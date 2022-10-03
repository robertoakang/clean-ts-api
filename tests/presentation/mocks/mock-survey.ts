import { mockSurveyModels } from '@/../tests/domain/mocks'
import { SurveyModel } from '@/domain/models'
import { IAddSurvey, ICheckSurveyById, ILoadAnswersBySurvey, ILoadSurveys } from '@/domain/usecases'

import { faker } from '@faker-js/faker'
export class AddSurveySpy implements IAddSurvey {
  addSurveyParams: IAddSurvey.Params

  async add (data: IAddSurvey.Params): Promise<void> {
    this.addSurveyParams = data
    return await Promise.resolve()
  }
}

export class LoadSurveysSpy implements ILoadSurveys {
  surveyModels = mockSurveyModels()
  accountId: string

  async load (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return await Promise.resolve(this.surveyModels)
  }
}

export class LoadAnswersBySurveySpy implements ILoadAnswersBySurvey {
  result = [faker.random.word(), faker.random.word()]
  id: string

  async loadAnswers (id: string): Promise<ILoadAnswersBySurvey.Result> {
    this.id = id
    return this.result
  }
}

export class CheckSurveyByIdSpy implements ICheckSurveyById {
  result = true
  id: string

  async checkById (id: string): Promise<ICheckSurveyById.Result> {
    this.id = id
    return this.result
  }
}
