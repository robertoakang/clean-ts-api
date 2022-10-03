import { IAddAccountRepository, ICheckAccountByEmailRepository, IHasher } from '@/data/protocols'
import { IAddAccount } from '@/domain/usecases'

export class DbAddAccount implements IAddAccount {
  constructor (
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddAccountRepository,
    private readonly checkAccountByEmailRepository: ICheckAccountByEmailRepository

  ) {}

  async add (accountData: IAddAccount.Params): Promise<IAddAccount.Result> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(accountData.email)
    let isValid = false
    if (!exists) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      isValid = await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
    }
    
    return isValid
  }
}
