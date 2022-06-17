export interface AddSurveyModel {
  question: string
  answers: SurvayAnswer[]
}

export interface SurvayAnswer {
  image: string
  answer: string
}

export interface AddSurvey {
  add: (data: AddSurveyModel) => Promise<void>
}
