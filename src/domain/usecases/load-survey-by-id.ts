import { SurveyModel } from '@/domain/models/survey'

export interface ILoadSurveys {
  loadById: (id: string) => Promise<SurveyModel>
}
