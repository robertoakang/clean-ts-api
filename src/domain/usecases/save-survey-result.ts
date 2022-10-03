import { SurveyResultModel } from '@/domain/models'

export type SaveSurveyResultParams = {
  surveyId: string
  accountId: string
  answer: string
  date: Date
}

export interface ISaveSurveyResult {
  save: (data: SaveSurveyResultParams) => Promise<SurveyResultModel>
}