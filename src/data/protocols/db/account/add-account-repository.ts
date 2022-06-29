import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { AccountModel } from '@/domain/models/account'

export interface IAddAccountRepository {
  add: (accountData: AddAccountParams) => Promise<AccountModel>
}
