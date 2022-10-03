import { ISaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases'
import { SurveyResultModel } from '@/domain/models'
import { ISaveSurveyResultRepository, ILoadSurveyResultRepository } from '@/data/protocols'

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: ISaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: ILoadSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId, data.accountId)
    return surveyResult
  }
}
