import { MongoHelper } from '../helpers/mongo-helper'
import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { AccountModel } from '@/domain/models/account'
import { IAddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { ILoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { IUpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { ILoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements IAddAccountRepository, ILoadAccountByEmailRepository, IUpdateAccessTokenRepository, ILoadAccountByTokenRepository {
  async add (data: AddAccountParams): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.insertOne(data)
    return MongoHelper.map(data)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: {
        accessToken: token
      }
    })
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    })

    return account && MongoHelper.map(account)
  }
}
