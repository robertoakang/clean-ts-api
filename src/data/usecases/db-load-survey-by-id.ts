import { ILoadSurveyById } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { ILoadSurveyByIdRepository } from '@/data/protocols'

export class DbLoadSurveyById implements ILoadSurveyById {
  constructor (private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository) {}

  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)
    return survey
  }
}
