import { ILoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { DbLoadSurveyById } from '@/data/usecases'
import { SurveyMongoRepository } from '@/infra/db'

export const makeDbLoadSurveyById = (): ILoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyById(surveyMongoRepository)
}
