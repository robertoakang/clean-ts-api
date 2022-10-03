import { ICheckSurveyById } from '@/domain/usecases'
import { ICheckSurveyByIdRepository } from '@/data/protocols'

export class DbCheckSurveyById implements ICheckSurveyById {
  constructor (private readonly checkSurveyByIdRepository: ICheckSurveyByIdRepository) {}

  async checkById (id: string): Promise<ICheckSurveyById.Result> {
    return this.checkSurveyByIdRepository.checkById(id)
  }
}
