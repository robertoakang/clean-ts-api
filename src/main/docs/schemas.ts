import {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  signUpParamsSchema,
  addSurveyParamsSchema,
  surveyAnswerSchema,
  surveySchema,
  surveysSchema,
  saveSurveyParamsSchema,
  surveyResultSchema,
  surveyResultAnswerSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  error: errorSchema,
  addSurveyParams: addSurveyParamsSchema,
  surveys: surveysSchema,
  survey: surveySchema,
  surveyAnswer: surveyAnswerSchema,
  saveSurveyParams: saveSurveyParamsSchema,
  surveyResult: surveyResultSchema,
  surveyResultAnswer: surveyResultAnswerSchema
}
