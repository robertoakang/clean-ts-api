import { AddAccountParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'

export interface IAddAccountRepository {
  add: (data: AddAccountParams) => Promise<AccountModel>
}
