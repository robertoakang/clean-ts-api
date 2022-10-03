import { SurveyModel } from '@/domain/models'

export interface ILoadSurveyById {
  loadById: (id: string) => Promise<ILoadSurveyById.Result>
}

export namespace ILoadSurveyById {
  export type Result = SurveyModel
}
