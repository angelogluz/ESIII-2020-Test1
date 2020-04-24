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
  // TODO: listagem de todos os produtos
});

app.post('/products', (request, response) => {
  // TODO: Salvar produto no array products
});

app.put('/products/:id', (request, response) => {
  // TODO: Atualiza produto por ID
});

app.delete('/products/:code', (request, response) => {
  // TODO: Remove TODOS os produtos que possuam o código passado por parâmetro
});

app.post('/products/:code/love', (request, response) => {
  // TODO: Incrementa em 1 o número de lovers de todos os produtos que possuam 
  // o code do parâmetro
});

app.get('/products/:code', (request, response) => {
  // TODO: Busca de todos os produtos com o código recebido por parâmetro.
});

export default app;
