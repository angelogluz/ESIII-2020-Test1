/* eslint-disable no-undef */
import request from 'supertest';

import app from '../src/app';

let products;

beforeEach(() => {
  products = [{
    code: 12,
    description: 'Placa de vídeo ZT-650',
    buyPrice: 40.00,
    sellPrice: 80.00,
    tags: ['tecnologia', 'computador', 'gamer'],
  },
  {
    code: 99,
    description: 'Macbook Pro Retina 2020',
    buyPrice: 4000.00,
    sellPrice: 6000.00,
    tags: ['tecnologia', 'macbook', 'apple', 'macOS'],
  }];
});

test('deve ser possível criar um novo produto', async () => {
  const response = await request(app)
    .post('/products')
    .send(products[0]);

  expect(response.body).toMatchObject({
    ...products[0],
    lovers: 0,
  });
});

test('o status code de um produto criado deverá ser 201', async () => {
  const response = await request(app)
    .post('/products')
    .send(products[0]);
  expect(response.status).toBe(201);
});

test('deve ser possível atualizar dados de um produto', async () => {
  const responseSave = await request(app)
    .post('/products')
    .send(products[0]);
  const updatedProduct = {
    ...products[0],
    description: 'Macbook Pro Alterado',

  };
  const responseUpdate = await request(app)
    .put(`/products/${responseSave.body.id}`)
    .send(updatedProduct);

  expect(responseUpdate.body).toMatchObject(updatedProduct);
});

test('não deve ser possível atualizar um produto inexistente', async () => {
  await request(app)
    .put('/products/999999')
    .expect(400);
});

test('não deve ser possível remover um produto inexistente', async () => {
  await request(app)
    .put('/products/999999')
    .expect(400);
});

test('deve retornar o código 204 quando um produto for removido', async () => {
  const response = await request(app)
    .post('/products')
    .send(products[0]);

  await request(app)
    .delete(`/products/${response.body.code}`)
    .expect(204);
});

test('deve ser possível remover os produtos pelo código', async () => {
  const response = await request(app)
    .post('/products')
    .send(products[0]);

  await request(app)
    .post('/products')
    .send(products[1]);

  await request(app)
    .delete(`/products/${response.body.code}`)
    .expect(204);

  const all = await request(app)
    .get('/products');

  expect(all.body).not.toMatchObject([{ code: response.body.code }]);
});

test('deve ser possível listar todos os produtos', async () => {
  const responseSave = await request(app)
    .post('/products')
    .send(products[0]);

  const response = await request(app)
    .get('/products');
  expect(response.body).toEqual(
    expect.arrayContaining([
      {
        id: responseSave.body.id,
        ...products[0],
        lovers: 0,

      },
    ]),
  );
});

test('Deve ser possível buscar produtos por código no array', async () => {
  await request(app)
    .post('/products')
    .send({
      ...products[0],
      code: 40,
    });

  await request(app)
    .post('/products')
    .send({
      ...products[0],
      code: 40,
    });

  const responseGet = await request(app).get('/products/40');
  expect(responseGet.body).toHaveLength(2);
});

test('não deve ser possível atualizar o número de lovers de um produto manualmente', async () => {
  const responseSave = await request(app)
    .post('/products')
    .send(products[0]);
  const updatedProduct = {
    ...products[0],
    lovers: 10000000,
  };
  const responseUpdate = await request(app)
    .put(`/products/${responseSave.body.id}`)
    .send(updatedProduct);

  expect(responseUpdate.body.lovers).toBe(0);
});

test('deve ser possível dar love em um produto', async () => {
  const response = await request(app)
    .post('/products')
    .send(products[0]);

  const response2 = await request(app)
    .post(`/products/${response.body.code}/love`)
    .send(response.body);

  expect(response2.body).toMatchObject({
    lovers: 1,
  });
});

test('deve possuir o número de lovers igual a 0 um produto recém criado o qual o seu código seja inexistente', async () => {
  const response = await request(app)
    .post('/products')
    .send({
      ...products[0],
      code: 12344321,
      lovers: 10,
    });
  expect(response.body).toMatchObject({
    lovers: 0,
  });
});

test('Um produto deverá herdar o número de lovers caso seu código já exista', async () => {
  const response = await request(app)
    .post('/products')
    .send({
      ...products[0],
      code: 201,
    });

  await request(app)
    .post(`/products/${response.body.code}/love`)
    .send(response.body);

  const response2 = await request(app)
    .post('/products')
    .send({
      ...products[0],
      code: 201,
    });

  expect(response2.body).toMatchObject({
    lovers: 1,
  });
});

test('Produtos de mesmo código devem compartilhar os lovers', async () => {
  const response = await request(app)
    .post('/products')
    .send({
      ...products[0],
      code: 201,
    });

  await request(app)
    .post(`/products/${response.body.code}/love`)
    .send(response.body);

  const response2 = await request(app)
    .post('/products')
    .send({
      ...products[0],
      code: 201,
    });

  await request(app)
    .post(`/products/${response2.body.code}/love`)
    .send(response2.body);


  expect(response2.body).toMatchObject({
    lovers: 2,
  });
});
