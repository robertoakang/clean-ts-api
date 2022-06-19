export interface AddSurveyModel {
  question: string
  answers: SurvayAnswer[]
  date: Date
}

export interface SurvayAnswer {
  image?: string
  answer: string
}

export interface AddSurvey {
  add: (data: AddSurveyModel) => Promise<void>
}
