import { IController } from '@/presentation/protocols'

export const adaptResolver = async (controller: IController, args): Promise<any> => {
  const httpResponse = await controller.handle(args)
  return httpResponse.body
}
