import { LogControllerDecorator } from '@/main/decorators'
import { LogMongoRepository } from '@/infra/db'
import { IController } from '@/presentation/protocols'

export const makeLogControllerDecorator = (controller: IController): IController => {
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}
