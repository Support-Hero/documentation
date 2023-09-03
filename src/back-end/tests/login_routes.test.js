import app from '../app.js'
import request from 'supertest'

// Test the login with seed data user
// Test will fail if seed data is altered
describe("Login Test with correct user", () => {
  let res
  beforeAll(async () => {
    res = await request(app).post('/login').send({
      email: 'emma@example.com',
      password: 'password',
    })
  })
  test('Login returns a token', async () => {
    expect(res.body.token).toBeDefined()
  })
  test('Login returns an _id', async () => {
    expect(res.body._id).toBeDefined()
  })
  test('Login returns isManager', async () => {
    expect(res.body.isManager).toBeDefined()
    let isManagerCheck = typeof res.body.isManager
    expect(isManagerCheck == 'boolean')
  })
})

describe("Login Test with incorrect user", () => {
  let res
  beforeAll(async () => {
    res = await request(app).post('/login').send({
      email: 'thisisafakeuser@fakeuser.fakeuser',
      password: 'passwordpasswordpassword',
    })
  })
  test('Status', async () => {
    expect(res.status).toBe(401)
  })
  test('Login returns an error', async () => {
    expect(res.body.error).toBeDefined()
    expect(res.body.error).toBe('Email or password incorrect')
  })
})