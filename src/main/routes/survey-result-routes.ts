import { makeSaveSurveyResultController, makeLoadSurveyResultController } from '@/main/factories/controllers'
import { adaptRoute } from '@/main/adapters'
import { auth } from '@/main/middlewares/auth'
import { Router } from 'express'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', auth, adaptRoute(makeLoadSurveyResultController()))
}
