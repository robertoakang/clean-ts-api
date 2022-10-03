import { ISaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { ILoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'
import { mockSurveyResultModel } from '@/tests/domain/mocks'

export class SaveSurveyResultRepositorySpy implements ISaveSurveyResultRepository {
  saveSurveyResultParams: ISaveSurveyResultRepository.Params

  async save (data: ISaveSurveyResultRepository.Params): Promise<void> {
    this.saveSurveyResultParams = data
    return await Promise.resolve()
  }
}

export class LoadSurveyResultRepositorySpy implements ILoadSurveyResultRepository {
  result = mockSurveyResultModel()
  surveyId: string
  accountId: string

  async loadBySurveyId (surveyId: string, accountId: string): Promise<ILoadSurveyResultRepository.Result> {
    this.surveyId = surveyId
    this.accountId = accountId
    return await Promise.resolve(this.result)
  }
}
