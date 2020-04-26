/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
import express from 'express';
import cors from 'cors';
import { uuid } from 'uuidv4';

const app = express();

app.use(express.json());
app.use(cors());

let products = [];

app.get('/products', (request, response) => {
  response.json(products);
});

app.post('/products', (request, response) => {
  // TODO: Desenvolver registro no array products
  const {
    code, description, buyPrice, sellPrice, tags,
  } = request.body;
  const p = products.find((v) => v.code == code);
  const lov = p ? p.lovers : 0;
  const product = {
    id: uuid(),
    code,
    description,
    buyPrice,
    sellPrice,
    tags,
    lovers: lov,
  };
  products.push(product);
  response.status(201).json(product);
});

app.put('/products/:id', (request, response) => {
  // TODO: Desenvolver atualização de produto por ID
  const { id } = request.params;

  const {
    description, buyPrice, sellPrice, tags,
  } = request.body;

  const p = products.find((v) => v.id == id);

  if (p) {
    p.description = description;
    p.buyPrice = buyPrice;
    p.sellPrice = sellPrice;
    p.tags = tags;

    response.json(p);
  } else {
    response.status(400).send();
  }
});

app.delete('/products/:code', (request, response) => {
  const { code } = request.params;
  const index = products.findIndex((v) => v.code == code);

  if (index == -1) {
    response.status(400).send();
  } else {
    products = products.filter((v) => v.code != code);
    response.status(204).send();
  }
});

app.post('/products/:code/love', (request, response) => {
  const { code } = request.params;

  const p = products.find((v) => v.code == code);

  if (!p) {
    response.status(400).send();
  } else {
    products.filter((v) => v.code == code)
      .map((val) => val.lovers += 1);

    response.json({
      lovers: p.lovers,
    });
  }
});

app.get('/products/:code', (request, response) => {
  // TODO: Desenvolver busca de produtos por código
});

export default app;
