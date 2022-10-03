import { ISaveSurveyResult } from '@/domain/usecases/survey-result/save-survey-result'
import { DbSaveSurveyResult } from '@/data/usecases'
import { SurveyResultMongoRepository } from '@/infra/db'

export const makeDbSaveSurveyResult = (): ISaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveyResultMongoRepository, surveyResultMongoRepository)
}
