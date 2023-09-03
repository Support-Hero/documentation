import app from '../app.js'
import request from 'supertest'
import { ObjectId } from "mongodb"

const roster = {
  date: Date(),
  shiftStart: 'lorem Ipsum',
  shiftEnd: 'lorem Ipsum',
  break: true,
  breakStart: 'lorem Ipsum',
  breakEnd: 'lorem Ipsum',
}


describe("roster route tests", () => {
  let res
  let token
  let postDeleteRes
  beforeAll(async () => {
    res = await request(app).post('/login').send({
      email: 'emma@example.com',
      password: 'password',
    })

    token = res.body.token
    res = await request(app).get('/rosters').set('Authorization', 'Bearer ' + token)
    let userReq = await request(app).get('/users').set('Authorization', 'Bearer ' + token)
    roster.worker = userReq.body[0]._id

    postDeleteRes = await request(app).post('/rosters').send(roster).set('Authorization', 'Bearer ' + token)
  })
  test('Get /', async () => {
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    expect(res.header['content-type']).toMatch('json')
  })
  test('/:id error handling: incorrect roster', async () => {
    let res2 = await request(app).get(`/rosters/${new ObjectId()}`).set('Authorization', 'Bearer ' + token)
    expect(res2.status).toBe(404)
    expect(res2.body.error).toBeDefined()
  })
  test('/:id error handling: type error', async () => {
    let res2 = await request(app).get('/rosters/test').set('Authorization', 'Bearer ' + token)
    expect(res2.status).toBe(500)
    expect(res2.body.error).toBeDefined()
  })
  test('POST', async () => {
    expect(postDeleteRes.status).toBe(201)
    expect(postDeleteRes.header['content-type']).toMatch('json')
    expect(postDeleteRes.body.shiftStart).toMatch(roster.shiftStart)
    expect(postDeleteRes.body.shiftEnd).toMatch(roster.shiftEnd)
  })
  test('POST with bad data', async () => {
    let badrosterData = {
      "incorrectKey" : "incorrectValue"
    }
    res = await request(app).post('/rosters').send(badrosterData).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(400)
    expect(res.body.error).toBeDefined()
  })
  test('PUT /rosters', async () => {
    res = await request(app).put(`/rosters/${postDeleteRes.body._id}`).send(roster).set('Authorization', 'Bearer ' + token)
    expect(res.body.shiftStart).toMatch(roster.shiftStart)
    expect(res.body.shiftEnd).toMatch(roster.shiftEnd)
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toMatch('json')
  })
  test('PUT /rosters, error handling 500', async () => {
    res = await request(app).put('/rosters/test').send(roster).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(500)
    expect(res.body.error).toBeDefined()
  })
  test('PUT /rosters, error handling 404', async () => {
    res = await request(app).put(`/rosters/${new ObjectId()}`).send(roster).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(404)
    expect(res.body.error).toBeDefined()
  })
  test('DELETE /:id', async () => {
    res = await request(app).delete(`/rosters/${postDeleteRes.body._id}`).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(200)
  })
  test('DELETE /:id error handling 404', async () => {
    res = await request(app).delete(`/rosters/${new ObjectId()}`).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(404)
    expect(res.body.error).toBeDefined()
  })
  test('DELETE /:id error handling 500', async () => {
    res = await request(app).delete(`/rosters/test`).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(500)
    expect(res.body.error).toBeDefined()
  })
  })