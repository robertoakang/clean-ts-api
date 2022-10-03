import { SurveyModel } from '@/domain/models'

export type AddSurveyParams = Omit<SurveyModel, 'id'>

export interface IAddSurvey {
  add: (data: AddSurveyParams) => Promise<void>
}
