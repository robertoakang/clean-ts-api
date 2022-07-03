import { DbLoadSurveyResult } from './db-load-survey-result'
import { SurveyResultModel, ILoadSurveyResultRepository } from './db-load-survey-result-protocols'
import { mockSurveyResultModel } from '@/domain/test'

describe('DbLoadSurveyResult UseCase', () => {
  test('Should call ILoadSurveyResultRepository with correct value', async () => {
    class LoadSurveyResultRepositoryStub implements ILoadSurveyResultRepository {
      async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
        return await Promise.resolve(mockSurveyResultModel())
      }
    }
    const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub()
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id')
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
