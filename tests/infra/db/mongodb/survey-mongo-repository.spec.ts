import { AccountModel } from '@/domain/models'
import { mockAddAccountParams, mockAddSurveyParams } from '@/../tests/domain/mocks'
import { Collection, ObjectId } from 'mongodb'
import { MongoHelper, SurveyMongoRepository } from '@/infra/db'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

const mockAccount = async (): Promise<AccountModel> => {
  const fakeAccount = await accountCollection.insertOne(mockAddAccountParams())
  const id = fakeAccount.insertedId.toHexString()
  const account = await accountCollection.findOne({ _id: new ObjectId(id) })
  return MongoHelper.map(account)
}

describe('SurveyMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a survey on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddSurveyParams())
      const count = await surveyCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      const account = await mockAccount()
      const addSurveyModels = [mockAddSurveyParams(), mockAddSurveyParams()]
      const result = await surveyCollection.insertMany(addSurveyModels)
      const survey = await surveyCollection.findOne({ _id: result.insertedIds[0] })
      await surveyResultCollection.insertOne({
        surveyId: survey._id,
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const sut = makeSut()
      const surveys = await sut.loadAll(account.id)
      expect(surveys.length).toBe(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe(addSurveyModels[0].question)
      expect(surveys[0].didAnswer).toBe(true)
      expect(surveys[1].question).toBe(addSurveyModels[1].question)
      expect(surveys[1].didAnswer).toBe(false)
    })

    test('Should load empty list', async () => {
      const account = await mockAccount()
      const sut = makeSut()
      const surveys = await sut.loadAll(account.id)
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load survey by id on success', async () => {
      const fakeSurvey = await surveyCollection.insertOne(mockAddSurveyParams())
      const id = fakeSurvey.insertedId.toHexString()
      const sut = makeSut()
      const survey = await sut.loadById(id)
      expect(survey.id).toBeTruthy()
      expect(survey).toBeTruthy()
    })
  })
})
