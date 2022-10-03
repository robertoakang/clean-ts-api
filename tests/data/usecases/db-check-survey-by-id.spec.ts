import { CheckSurveyByIdRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import { DbCheckSurveyById } from '@/data/usecases'

import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: DbCheckSurveyById
  checkSurveyByIdRepositorySpy: CheckSurveyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkSurveyByIdRepositorySpy = new CheckSurveyByIdRepositorySpy()
  const sut = new DbCheckSurveyById(checkSurveyByIdRepositorySpy)
  return {
    sut,
    checkSurveyByIdRepositorySpy
  }
}

let surveyId: string

describe('DbCheckSurveyById', () => {
  beforeEach(() => {
    surveyId = faker.datatype.uuid()
  })

  test('Should call ICheckSurveyByIdRepository with correct value', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    await sut.checkById(surveyId)
    expect(checkSurveyByIdRepositorySpy.id).toBe(surveyId)
  })

  test('Should return true if ICheckSurveyByIdRepository returns true', async () => {
    const { sut } = makeSut()
    const exists = await sut.checkById(surveyId)
    expect(exists).toBeTruthy()
  })

  test('Should return false if ICheckSurveyByIdRepository returns false', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    checkSurveyByIdRepositorySpy.result = false
    const exists = await sut.checkById(surveyId)
    expect(exists).toBeFalsy()
  })

  test('Should throw if ICheckSurveysRepository throws', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    jest.spyOn(checkSurveyByIdRepositorySpy, 'checkById').mockImplementationOnce(throwError)
    const promise = sut.checkById(surveyId)
    await expect(promise).rejects.toThrow()
  })
})
