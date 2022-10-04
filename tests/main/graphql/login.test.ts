import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'

import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import request from 'supertest'

let accountCollection: Collection

describe('Login GraphQL', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('Login Query', () => {
    const query = `query {
      login (email: "betoakang@gmail.com", password: "123") {
        accessToken
        name
      }
    }`

    test('Should return an IAccount on valid credentials', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Roberto',
        email: 'betoakang@gmail.com',
        password
      })

      const res = await request(app)
        .post('/graphql')
        .send({ query })

      expect(res.status).toBe(200)
      expect(res.body.data?.login.accessToken).toBeTruthy()
      expect(res.body.data?.login.name).toBe('Roberto')
    })
  })
})
