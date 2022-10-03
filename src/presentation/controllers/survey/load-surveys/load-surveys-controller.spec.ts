import { LoadSurveysController } from './load-surveys-controller'
import { HttpRequest } from './load-surveys-controller-protocols'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadSurveysSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'
import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

const mockRequest = (): HttpRequest => ({ accountId: faker.datatype.uuid() })

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysSpy: LoadSurveysSpy
}

const makeSut = (): SutTypes => {
  const loadSurveysSpy = new LoadSurveysSpy()
  const sut = new LoadSurveysController(loadSurveysSpy)
  return {
    sut,
    loadSurveysSpy
  }
}

describe('ILoadSurveys IController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call ILoadSurveys with correct value', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSurveysSpy.accountId).toBe(httpRequest.accountId)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadSurveysSpy.surveyModels))
  })

  test('Should return 204 if ILoadSurveys returns empty', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    loadSurveysSpy.surveyModels = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if ILoadSurveys throws', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    jest.spyOn(loadSurveysSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
