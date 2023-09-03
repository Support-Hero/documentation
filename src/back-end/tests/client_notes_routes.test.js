import app from '../app.js'
import request from 'supertest'
import { ObjectId } from "mongodb"

const note = {
  date: Date(),
  goals: 'lorem Ipsum',
  presentation: 'lorem Ipsum',
  actions: 'lorem Ipsum',
  outcome: 'lorem Ipsum',
  followUp: false,
  isMgrAuthorised: true
}


describe("note route tests", () => {
  let res
  let token
  let postDeleteRes
  beforeAll(async () => {
    res = await request(app).post('/login').send({
      email: 'emma@example.com',
      password: 'password',
    })

    token = res.body.token
    res = await request(app).get('/notes').set('Authorization', 'Bearer ' + token)
    let userReq = await request(app).get('/users').set('Authorization', 'Bearer ' + token)
    let clientReq = await request(app).get('/clients').set('Authorization', 'Bearer ' + token)
    note.author = userReq.body[0]._id
    note.client = clientReq.body[0]._id

    postDeleteRes = await request(app).post('/notes').send(note).set('Authorization', 'Bearer ' + token)
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
    let res2 = await request(app).get(`/notes/${res.body[0]._id}`).set('Authorization', 'Bearer ' + token)
    expect(res2.status).toBe(200)
    expect(res2.header['content-type']).toMatch('json')
    expect(res2.body._id).toBeDefined()
  })
  test('/:id error handling: incorrect note', async () => {
    let res2 = await request(app).get(`/notes/${new ObjectId()}`).set('Authorization', 'Bearer ' + token)
    expect(res2.status).toBe(404)
    expect(res2.body.error).toBeDefined()
  })
  test('/:id error handling: type error', async () => {
    let res2 = await request(app).get('/notes/test').set('Authorization', 'Bearer ' + token)
    expect(res2.status).toBe(500)
    expect(res2.body.error).toBeDefined()
  })
  test('POST', async () => {
    expect(postDeleteRes.status).toBe(201)
    expect(postDeleteRes.header['content-type']).toMatch('json')
    expect(postDeleteRes.body.actions).toMatch(note.actions)
    expect(postDeleteRes.body.outcome).toMatch(note.outcome)
  })
  test('POST with bad data', async () => {
    let badnoteData = {
      "incorrectKey" : "incorrectValue"
    }
    res = await request(app).post('/notes').send(badnoteData).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(400)
    expect(res.body.error).toBeDefined()
  })
  test('PUT /notes', async () => {
    res = await request(app).put(`/notes/${postDeleteRes.body._id}`).send(note).set('Authorization', 'Bearer ' + token)
    expect(res.body.actions).toMatch(note.actions)
    expect(res.body.outcome).toMatch(note.outcome)
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toMatch('json')
  })
  test('PUT /notes, error handling 500', async () => {
    res = await request(app).put('/notes/test').send(note).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(500)
    expect(res.body.error).toBeDefined()
  })
  test('PUT /notes, error handling 404', async () => {
    res = await request(app).put(`/notes/${new ObjectId()}`).send(note).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(404)
    expect(res.body.error).toBeDefined()
  })
  test('DELETE /:id', async () => {
    res = await request(app).delete(`/notes/${postDeleteRes.body._id}`).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(200)
  })
  test('DELETE /:id error handling 404', async () => {
    res = await request(app).delete(`/notes/${new ObjectId()}`).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(404)
    expect(res.body.error).toBeDefined()
  })
  test('DELETE /:id error handling 500', async () => {
    res = await request(app).delete(`/notes/test`).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(500)
    expect(res.body.error).toBeDefined()
  })
  })