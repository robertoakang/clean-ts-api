import { ISaveSurveyResult } from '@/domain/usecases'
import { ISaveSurveyResultRepository, ILoadSurveyResultRepository } from '@/data/protocols'

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: ISaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: ILoadSurveyResultRepository
  ) {}

  async save (data: ISaveSurveyResult.Params): Promise<ISaveSurveyResult.Result> {
    await this.saveSurveyResultRepository.save(data)
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId, data.accountId)
    return surveyResult
  }
}
