import app from '../app.js'
import request from 'supertest'
import { ObjectId } from "mongodb"

const client = {
  
  address: "test",
  phoneNumber: "0455555578",
  firstName: "test",
  lastName: "test",
}


describe("Client route tests", () => {
  let res
  let token
  let postDeleteRes
  beforeAll(async () => {
    res = await request(app).post('/login').send({
      email: 'emma@example.com',
      password: 'password',
    })

    token = res.body.token
    res = await request(app).get('/clients').set('Authorization', 'Bearer ' + token)
    let noteReq = await request(app).get('/notes').set('Authorization', 'Bearer ' + token)
    let userReq = await request(app).get('/users').set('Authorization', 'Bearer ' + token)
    client.clientNotes = [noteReq.body[0]._id]
    client.assignedWorkers = [userReq.body[0]._id]
    postDeleteRes = await request(app).post('/clients').send(client).set('Authorization', 'Bearer ' + token)
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
    let res2 = await request(app).get(`/clients/${res.body[0]._id}`).set('Authorization', 'Bearer ' + token)
    expect(res2.status).toBe(200)
    expect(res2.header['content-type']).toMatch('json')
    expect(res2.body._id).toBeDefined()
  })
  test('/:id error handling: incorrect client', async () => {
    let res2 = await request(app).get(`/clients/${new ObjectId()}`).set('Authorization', 'Bearer ' + token)
    expect(res2.status).toBe(404)
    expect(res2.body.error).toBeDefined()
  })
  test('/:id error handling: type error', async () => {
    let res2 = await request(app).get('/clients/test').set('Authorization', 'Bearer ' + token)
    expect(res2.status).toBe(500)
    expect(res2.body.error).toBeDefined()
  })
  test('POST', async () => {
    expect(postDeleteRes.status).toBe(201)
    expect(postDeleteRes.header['content-type']).toMatch('json')
    expect(postDeleteRes.body.firstName).toMatch(client.firstName)
    expect(postDeleteRes.body.lastName).toMatch(client.lastName)
  })
  test('POST with bad data', async () => {
    let badclientData = {
      "incorrectKey" : "incorrectValue"
    }
    res = await request(app).post('/clients').send(badclientData).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(400)
    expect(res.body.error).toBeDefined()
  })
  test('PUT /clients', async () => {
    res = await request(app).put(`/clients/${postDeleteRes.body._id}`).send(client).set('Authorization', 'Bearer ' + token)
    expect(res.body.firstName).toMatch(client.firstName)
    expect(res.body.lastName).toMatch(client.lastName)
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toMatch('json')
  })
  test('PUT /clients, error handling 500', async () => {
    res = await request(app).put('/clients/test').send(client).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(500)
    expect(res.body.error).toBeDefined()
  })
  test('PUT /clients, error handling 404', async () => {
    res = await request(app).put(`/clients/${new ObjectId()}`).send(client).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(404)
    expect(res.body.error).toBeDefined()
  })
  test('DELETE /:id', async () => {
    res = await request(app).delete(`/clients/${postDeleteRes.body._id}`).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(200)
  })
  test('DELETE /:id error handling 404', async () => {
    res = await request(app).delete(`/clients/${new ObjectId()}`).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(404)
    expect(res.body.error).toBeDefined()
  })
  test('DELETE /:id error handling 500', async () => {
    res = await request(app).delete(`/clients/test`).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(500)
    expect(res.body.error).toBeDefined()
  })
  })