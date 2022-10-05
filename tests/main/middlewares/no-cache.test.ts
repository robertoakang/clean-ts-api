import { setupApp } from '@/main/config/app'
import { noCache } from '@/main/middlewares'

import { Express } from 'express'
import request from 'supertest'

let app: Express

describe('NoCache IMiddleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })

  test('Should disabe cache', async () => {
    app.get('/test_no_cache', noCache, (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_no_cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
