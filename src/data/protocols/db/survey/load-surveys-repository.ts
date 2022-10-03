import { SurveyModel } from '@/domain/models'

export interface ILoadSurveysRepository {
  loadAll: (accountId: string) => Promise<SurveyModel[]>
}
