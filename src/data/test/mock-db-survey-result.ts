import { ISaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { ILoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '@/domain/test'

export const mockSaveSurveyResultRepository = (): ISaveSurveyResultRepository => {
  class SurveyResultRepositoryStub implements ISaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<void> {
      return await Promise.resolve()
    }
  }

  return new SurveyResultRepositoryStub()
}

export const mockLoadSurveyResultRepository = (): ILoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements ILoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultRepositoryStub()
}
