import { IAddSurvey, ILoadSurveys, ILoadSurveyById, ICheckSurveyById } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { mockSurveyModel, mockSurveyModels } from '@/../tests/domain/mocks'

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

export class LoadSurveyByIdSpy implements ILoadSurveyById {
  surveyModel = mockSurveyModel()
  id: string

  async loadById (id: string): Promise<ILoadSurveyById.Result> {
    this.id = id
    return this.surveyModel
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
