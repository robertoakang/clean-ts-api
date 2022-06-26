import { MongoHelper } from '../helpers/mongo-helper'
import { ISaveSurveyResultRepository, SaveSurveyResultModel, SurveyResultModel } from '@/data/usecases/save-survey-result/db-save-survey-result-protocols'
import { ObjectId } from 'mongodb'

export class SurveyResultMongoRepository implements ISaveSurveyResultRepository {
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    const res = await surveyResultCollection.findOneAndUpdate({
      surveyId: new ObjectId(data.surveyId),
      accountId: new ObjectId(data.accountId)
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true,
      returnDocument: 'after'
    })

    return res.value && MongoHelper.map(res.value)
  }
}