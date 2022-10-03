import { SurveyModel } from '@/domain/models'

export interface ILoadSurveysRepository {
  loadAll: (accountId: string) => Promise<ILoadSurveysRepository.Result>
}

export namespace ILoadSurveysRepository {
  export type Result = SurveyModel[]
}
