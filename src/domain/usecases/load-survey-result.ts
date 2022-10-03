import { SurveyResultModel } from '@/domain/models'

export interface ILoadSurveyResult {
  load: (surveyId: string, accountId: string) => Promise<ILoadSurveyResult.Result>
}

export namespace ILoadSurveyResult {
  export type Result = SurveyResultModel
}
