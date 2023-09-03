import app from '../app.js'
import request from 'supertest'
import { ObjectId } from "mongodb"

const user = {
  email: "test",
  password: "test",
  phoneNumber: "test",
  firstName: "test",
  lastName: "test",
  isManager: false,
  clients: [
      "64ead5e2c3e94c340b8d51ec"
  ]
}


describe("User route tests", () => {
  let res
  let token
  let postDeleteRes
  beforeAll(async () => {
    res = await request(app).post('/login').send({
      email: 'emma@example.com',
      password: 'password',
    })

    token = res.body.token
    res = await request(app).get('/users').set('Authorization', 'Bearer ' + token)
    postDeleteRes = await request(app).post('/users').send(user).set('Authorization', 'Bearer ' + token)
  })
  test('Get /', async () => {
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    res.body.forEach(el => {
      expect(el._id).toBeDefined()
    })
    expect(res.header['content-type']).toMatch('json')
  })
  test('Get /:id', async () => {
    let res2 = await request(app).get(`/users/${res.body[0]._id}`).set('Authorization', 'Bearer ' + token)
    expect(res2.status).toBe(200)
    expect(res2.header['content-type']).toMatch('json')
    expect(res2.body._id).toBeDefined()
  })
  test('/:id error handling: incorrect user', async () => {
    let res2 = await request(app).get(`/users/${new ObjectId()}`).set('Authorization', 'Bearer ' + token)
    expect(res2.status).toBe(404)
    expect(res2.body.error).toBeDefined()
  })
  test('/:id error handling: type error', async () => {
    let res2 = await request(app).get('/users/test').set('Authorization', 'Bearer ' + token)
    expect(res2.status).toBe(500)
    expect(res2.body.error).toBeDefined()
  })
  test('POST', async () => {
    expect(postDeleteRes.status).toBe(201)
    expect(postDeleteRes.header['content-type']).toMatch('json')
    expect(postDeleteRes.body.firstName).toMatch(user.firstName)
    expect(postDeleteRes.body.lastName).toMatch(user.lastName)
  })
  test('POST with bad data', async () => {
    let badUserData = {
      "incorrectKey" : "incorrectValue"
    }
    res = await request(app).post('/users').send(badUserData).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(400)
    expect(res.body.error).toBeDefined()
  })
  test('PUT /users', async () => {
    res = await request(app).put(`/users/${postDeleteRes.body._id}`).send(user).set('Authorization', 'Bearer ' + token)
    expect(res.body.firstName).toMatch(user.firstName)
    expect(res.body.lastName).toMatch(user.lastName)
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toMatch('json')
  })
  test('PUT /users, error handling 500', async () => {
    res = await request(app).put('/users/test').send(user).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(500)
    expect(res.body.error).toBeDefined()
  })
  test('PUT /users, error handling 404', async () => {
    res = await request(app).put(`/users/${new ObjectId()}`).send(user).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(404)
    expect(res.body.error).toBeDefined()
  })
  test('DELETE /:id', async () => {
    res = await request(app).delete(`/users/${postDeleteRes.body._id}`).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(200)
  })
  test('DELETE /:id error handling 404', async () => {
    res = await request(app).delete(`/users/${new ObjectId()}`).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(404)
    expect(res.body.error).toBeDefined()
  })
  test('DELETE /:id error handling 500', async () => {
    res = await request(app).delete(`/users/test`).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(500)
    expect(res.body.error).toBeDefined()
  })
  test('auth middleware', async () => {
    res = await request(app).get('/users')
    expect(res.status).toBe(401)
    expect(res.body.error).toBeDefined()
  })
  })