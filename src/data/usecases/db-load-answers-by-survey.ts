import { ILoadAnswersBySurvey } from '@/domain/usecases'
import { ILoadSurveyByIdRepository } from '@/data/protocols'

export class DbLoadAnswersBySurvey implements ILoadAnswersBySurvey {
  constructor (private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository) {}

  async loadAnswers (id: string): Promise<ILoadAnswersBySurvey.Result> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)
    return survey?.answers.map(a => a.answer) || []
  }
}
