import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { AccountModel } from '@/domain/models'

export interface IAddAccountRepository {
  add: (data: AddAccountParams) => Promise<AccountModel>
}
