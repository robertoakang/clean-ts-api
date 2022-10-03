
import { ISaveSurveyResult, ILoadSurveyResult } from '@/domain/usecases'
import { mockSurveyResultModel } from '@/../tests/domain/mocks'

export class SaveSurveyResultSpy implements ISaveSurveyResult {
  result = mockSurveyResultModel()
  saveSurveyResultParams: ISaveSurveyResult.Params

  async save (data: ISaveSurveyResult.Params): Promise<ISaveSurveyResult.Result> {
    this.saveSurveyResultParams = data
    return this.result
  }
}

export class LoadSurveyResultSpy implements ILoadSurveyResult {
  result = mockSurveyResultModel()
  surveyId: string
  accountId: string

  async load (surveyId: string, accountId: string): Promise<ILoadSurveyResult.Result> {
    this.surveyId = surveyId
    this.accountId = accountId
    return this.result
  }
}
