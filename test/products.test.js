/* eslint-disable no-undef */
import request from 'supertest';

import app from '../src/app';

let products;

beforeEach(() => {
  products = [{
    code: 12,
    description: 'Macbook pro retina 2020',
    buyPrice: 4000,
    sellPrice: 8000,
    tags: ['tecnologia', 'Apple', 'computador'],
  }, {
    code: 99,
    description: 'Positivo pro retina 2020',
    buyPrice: 1000,
    sellPrice: 2000,
    tags: ['tecnologia', 'Positivo', 'computador'],
  }];
});

test('Deve ser possível adicionar um novo produto', async () => {
  const response = await request(app)
    .post('/products')
    .send(products[0]);

  expect(response.body).toMatchObject({
    ...products[0],
    lovers: 0,
  });
});

test('O status code de um produto criado deverá ser 201', async () => {
  await request(app)
    .post('/products')
    .send(products[0]);

  expect(201);
});

test('Deve ser possível atualizar dados de um produto', async () => {
  const response = await request(app)
    .post('/products')
    .send(products[0]);

  const updateProduct = {
    ...products[0],
    description: 'Dell Vostro',
  };

  const responseUpdate = await request(app)
    .put(`/products/${response.body.id}`)
    .send(updateProduct);

  expect(responseUpdate.body).toMatchObject(updateProduct);
});

test('Não deve ser possível atualizar um produto inexistente', async () => {
  await request(app)
    .put('/products/9198123')
    .expect(400);
});

test('Não deve ser possível remover um produto inexistente', async () => {
  await request(app)
    .delete('/products/9198123')
    .expect(400);
});

test('Deve retornar o código 204 quando um produto for removido', async () => {
  const response = await request(app)
    .post('/products')
    .send(products[0]);

  await request(app)
    .delete(`/products/${response.body.code}`)
    .expect(204);
});

test('Deve ser possível listar todos os produtos', async () => {
  const response = await request(app)
    .post('/products')
    .send(products[0]);

  const responseGet = await request(app)
    .get('/products');

  expect(responseGet.body).toHaveLength(1);
});

test('Deve ser possível remover os produtos pelo código', async () => {
  await request(app)
    .post('/products')
    .send(products[0]);

  const response = await request(app)
    .post('/products')
    .send(products[0]);

  await request(app)
    .post('/products')
    .send(products[1]);

  await request(app)
    .delete(`/products/${response.body.code}`);

  const responseAll = await request(app)
    .get('/products');

  expect(responseAll.body).toHaveLength(1);
});

test('Deve ser possível dar love em um produto', async () => {
  const response = await request(app)
    .post('/products')
    .send(products[0]);

  const responseLove = await request(app)
    .post(`/products/${response.body.code}/love`)
    .send(response.body);

  expect(responseLove.body).toMatchObject({
    lovers: 1,
  });
});
