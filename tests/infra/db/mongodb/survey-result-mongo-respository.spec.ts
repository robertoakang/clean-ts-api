import { SurveyResultMongoRepository, MongoHelper } from '@/infra/db'
import { SurveyModel } from '@/domain/models'
import { mockAddSurveyParams, mockAddAccountParams } from '@/../tests/domain/mocks'
import { Collection, ObjectId } from 'mongodb'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const mockSurvey = async (): Promise<SurveyModel> => {
  const fakeSurvey = await surveyCollection.insertOne(mockAddSurveyParams())
  const id = fakeSurvey.insertedId.toHexString()
  const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
  return MongoHelper.map(survey)
}

const mockAccountId = async (): Promise<string> => {
  const fakeAccount = await accountCollection.insertOne(mockAddAccountParams())
  return fakeAccount.insertedId.toHexString()
}

describe('SurveyResultMongoRepository', () => {
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

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const survey = await mockSurvey()
      const accountId = await mockAccountId()
      const sut = makeSut()
      await sut.save({
        surveyId: survey.id,
        accountId,
        answer: survey.answers[0].answer,
        date: new Date()
      })

      const surveyResult = await surveyResultCollection.findOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId)
      })

      expect(surveyResult).toBeTruthy()
    })

    test('Should update survey result if it exists', async () => {
      const survey = await mockSurvey()
      const accountId = await mockAccountId()
      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId),
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const sut = makeSut()
      await sut.save({
        surveyId: survey.id,
        accountId,
        answer: survey.answers[1].answer,
        date: new Date()
      })
      const surveyResult = await surveyResultCollection
        .find({
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(accountId)
        })
        .toArray()
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.length).toBe(1)
    })
  })

  describe('loadBySurveyId()', () => {
    test('Should load survey result', async () => {
      const survey = await mockSurvey()
      const firstAccountId = await mockAccountId()
      const secondAccountId = await mockAccountId()
      await surveyResultCollection.insertMany([{
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(secondAccountId),
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(firstAccountId),
        answer: survey.answers[0].answer,
        date: new Date()
      }])

      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, firstAccountId)

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(new ObjectId(survey.id))
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(100)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBeTruthy()
      expect(surveyResult.answers[1].count).toBe(0)
      expect(surveyResult.answers[1].percent).toBe(0)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBeFalsy()
      expect(surveyResult.answers.length).toBe(survey.answers.length)
    })

    test('Should load survey result 2', async () => {
      const survey = await mockSurvey()
      const firstAccountId = await mockAccountId()
      const secondAccountId = await mockAccountId()
      const thirdAccountId = await mockAccountId()
      await surveyResultCollection.insertMany([{
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(firstAccountId),
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(secondAccountId),
        answer: survey.answers[1].answer,
        date: new Date()
      }, {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(thirdAccountId),
        answer: survey.answers[1].answer,
        date: new Date()
      }])

      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, secondAccountId)

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(new ObjectId(survey.id))
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(67)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBeTruthy()
      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(33)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBeFalsy()
      expect(surveyResult.answers.length).toBe(survey.answers.length)
    })

    test('Should load survey result 3', async () => {
      const survey = await mockSurvey()
      const firstAccountId = await mockAccountId()
      const secondAccountId = await mockAccountId()
      const thirdAccountId = await mockAccountId()
      await surveyResultCollection.insertMany([{
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(firstAccountId),
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(secondAccountId),
        answer: survey.answers[1].answer,
        date: new Date()
      }])

      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, thirdAccountId)

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(new ObjectId(survey.id))
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(50)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBeFalsy()
      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(50)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBeFalsy()
      expect(surveyResult.answers.length).toBe(survey.answers.length)
    })

    test('Should return null if there is no survey result', async () => {
      const survey = await mockSurvey()
      const accountId = await mockAccountId()
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, accountId)
      expect(surveyResult).toBeNull()
    })
  })
})
