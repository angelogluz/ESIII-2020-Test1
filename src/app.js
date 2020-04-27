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
  const {
    code, description, buyPrice, sellPrice, tags,
  } = request.body;
  const p = products.find((v) => v.code == code);
  const lov = !p ? 0 : p.lovers;
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
  // TODO
  const { id } = request.params;
  const {
    description, buyPrice, sellPrice, tags,
  } = request.body;

  const product = products.find((value) => value.id == id);
  if (!product) {
    response.status(400).send();
  } else {
    product.description = description;
    product.buyPrice = buyPrice;
    product.sellPrice = sellPrice;
    product.tags = tags;

    response.json(product);
  }
});

app.delete('/products/:code', (request, response) => {
  const { code } = request.params;
  const index = products.findIndex((v) => v.code == code);
  if (index == -1) {
    response.status(400).send();
  } else {
    products = products.filter((value) => value.code != code);
    response.status(204).send();
  }
});

app.post('/products/:code/love', (request, response) => {
  const { code } = request.params;

  const product = products.find((v) => v.code == code);
  if (product === undefined) {
    response.status(400).send();
  } else {
    products.filter((value) => value.code == code)
      .map((v) => v.lovers += 1);

    response.json({ lovers: product.lovers });
  }
});

app.get('/products/:code', (request, response) => {
  const { code } = request.params;

  response.json(products.filter((v) => v.code == code));
});

export default app;