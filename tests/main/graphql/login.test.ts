import { MongoHelper } from '@/infra/db'
import { setupApp } from '@/main/config/app'

import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { Express } from 'express'
import request from 'supertest'

let accountCollection: Collection
let app: Express

describe('Login GraphQL', () => {
  beforeAll(async () => {
    app = await setupApp()
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

    test('Should return UnauthorizedError on invalid credentials', async () => {
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(401)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toBe('Unauthorized')
    })

    describe('SignUp Mutation', () => {
      const query = `mutation {
        signUp (name: "Roberto", email: "betoakang@gmail.com", password: "123", passwordConfirmation: "123") {
          accessToken
          name
        }
      }`

      test('Should return an IAccount on valid data', async () => {
        const res = await request(app)
          .post('/graphql')
          .send({ query })
        expect(res.status).toBe(200)
        expect(res.body.data.signUp.accessToken).toBeTruthy()
        expect(res.body.data.signUp.name).toBe('Roberto')
      })

      test('Should return EmailInUseError on invalid data', async () => {
        const password = await hash('123', 12)
        await accountCollection.insertOne({
          name: 'Roberto',
          email: 'betoakang@gmail.com',
          password
        })

        const res = await request(app)
          .post('/graphql')
          .send({ query })
        expect(res.status).toBe(403)
        expect(res.body.data).toBeFalsy()
        expect(res.body.errors[0].message).toBe('The received email is already in use')
      })
    })
  })
})
