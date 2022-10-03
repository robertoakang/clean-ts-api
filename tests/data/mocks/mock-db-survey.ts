import { mockSurveyModel, mockSurveyModels } from '@/tests/domain/mocks'
import { IAddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { ILoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { ILoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { SurveyModel } from '@/domain/models/survey'
import { faker } from '@faker-js/faker'
import { ICheckSurveyByIdRepository, ILoadAnswersBySurveyRepository } from '../protocols'

export class AddSurveyRepositorySpy implements IAddSurveyRepository {
  addSurveyParams: IAddSurveyRepository.Params

  async add (data: IAddSurveyRepository.Params): Promise<void> {
    this.addSurveyParams = data
    return await Promise.resolve()
  }
}

export class LoadSurveyByIdRepositorySpy implements ILoadSurveyByIdRepository {
  result = mockSurveyModel()
  id: string

  async loadById (id: string): Promise<ILoadSurveyByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadAnswersBySurveyRepositorySpy implements ILoadAnswersBySurveyRepository {
  result = [faker.random.word(), faker.random.word()]
  id: string

  async loadAnswers (id: string): Promise<ILoadAnswersBySurveyRepository.Result> {
    this.id = id
    return this.result
  }
}

export class CheckSurveyByIdRepositorySpy implements ICheckSurveyByIdRepository {
  result = true
  id: string

  async checkById (id: string): Promise<ICheckSurveyByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadSurveysRepositorySpy implements ILoadSurveysRepository {
  surveyModels = mockSurveyModels()
  accountId: string

  async loadAll (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return await Promise.resolve(this.surveyModels)
  }
}
