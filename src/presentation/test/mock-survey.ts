import { AddSurveyParams, IAddSurvey } from '@/domain/usecases/survey/add-survey'
import { ILoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { SurveyModel } from '@/domain/models/survey'
import { ILoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'

export const mockAddSurvey = (): IAddSurvey => {
  class AddSurveyStub implements IAddSurvey {
    async add (data: AddSurveyParams): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddSurveyStub()
}

export const mockLoadSurveys = (): ILoadSurveys => {
  class LoadSurveysStub implements ILoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveyModels())
    }
  }

  return new LoadSurveysStub()
}

export const mockLoadSurveyById = (): ILoadSurveyById => {
  class LoadSurveyByIdStub implements ILoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return await Promise.resolve(mockSurveyModel())
    }
  }

  return new LoadSurveyByIdStub()
}
