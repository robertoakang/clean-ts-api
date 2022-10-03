
import { SaveSurveyResultParams, ISaveSurveyResult } from '@/domain/usecases/survey-result/save-survey-result'
import { ILoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '@/domain/test'

export class SaveSurveyResultSpy implements ISaveSurveyResult {
  surveyResultModel = mockSurveyResultModel()
  saveSurveyResultParams: SaveSurveyResultParams

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    this.saveSurveyResultParams = data
    return await Promise.resolve(this.surveyResultModel)
  }
}

export class LoadSurveyResultSpy implements ILoadSurveyResult {
  surveyResultModel = mockSurveyResultModel()
  surveyId: string
  accountId: string

  async load (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId
    this.accountId = accountId
    return await Promise.resolve(this.surveyResultModel)
  }
}
