import { IAddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { ILoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { ILoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'

export const mockAddSurveyRepository = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {
      return await Promise.resolve()
    }
  }

  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): ILoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements ILoadSurveyByIdRepository {
    async loadById (): Promise<SurveyModel> {
      return await Promise.resolve(mockSurveyModel())
    }
  }

  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = (): ILoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveyModels())
    }
  }

  return new LoadSurveysRepositoryStub()
}
