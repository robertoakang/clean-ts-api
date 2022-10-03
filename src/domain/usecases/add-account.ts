import { AccountModel } from '@/domain/models'

export interface IAddAccount {
  add: (account: IAddAccount.Params) => Promise<IAddAccount.Result>
}

export namespace IAddAccount {
  export type Params = Omit<AccountModel, 'id'>
  export type Result = boolean
}
