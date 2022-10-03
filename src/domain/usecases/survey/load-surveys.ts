import { SurveyModel } from '@/domain/models'

export interface ILoadSurveys {
  load: (accountId: string) => Promise<SurveyModel[]>
}
