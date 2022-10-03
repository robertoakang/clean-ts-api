import { ILoadSurveyById } from '@/domain/usecases'
import { ILoadSurveyByIdRepository } from '@/data/protocols'

export class DbLoadSurveyById implements ILoadSurveyById {
  constructor (private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository) {}

  async loadById (id: string): Promise<ILoadSurveyById.Result> {
    return this.loadSurveyByIdRepository.loadById(id)
  }
}
