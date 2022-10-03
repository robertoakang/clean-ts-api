import { SurveyModel } from '@/domain/models'

export interface ILoadSurveyById {
  loadById: (id: string) => Promise<SurveyModel>
}
