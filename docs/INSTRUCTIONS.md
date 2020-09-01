# Requisitos/Especificação
Este documento apresenta parte do conhecimento necessário para o desenvolvimento da tarefa. Conhecimentos adicionais serão extraídos de comentários de dentro dos arquivos de desenvolvimento e dos retornos dos arquivos de teste.
## Criação
1.1 - Deve ser possível adicionar um novo produto

1.2 - O status code de um produto criado deverá ser 201

- *``POST /products:``* A rota deverá receber <code>code, description, buyPrice, sellPrice e tags</code>.

Exemplo de objeto após cadastro do novo produto:

```json
{
  "id": "1b820cb9-1ffa-415d-80af-a91641b9c53e",
  "code": 2,
  "description": "Macbook pro retina 2019",
  "buyPrice": 4000,
  "sellPrice": 7000,
  "tags": [
    "tecnologia",
    "computador",
    "apple"
  ],
  "lovers": 0
}
```

Observação: 
1 - O número de ``lovers`` de um produto recém criado deverá ser sempre 0 (zero) caso o código não exista, caso o código já exista deverá ser o mesmo dos demais de mesmo código.

2 - o ``id`` deverá ser gerado com a lib ``uuidv4``, que irá gerar um identificador único para nossos objetos.

## Atualização
2.1 - Deve ser possível atualizar dados de um produto

2.2 - Não deve ser possível atualizar um produto inexistente

- ``*PUT /products/:id:``* A rota deverá alterar <code>code, description, buyPrice, sellPrice e tags</code> do produto através do seu id.

## Remoção
3.1 - Não deve ser possível remover um produto inexistente. Na tentativa disto deverá ser retornado um status code 400.

3.2 - Deve retornar o código ``204`` quando um produto for removido

3.3 - Deve ser possível remover os produtos pelo código

- *``DELETE /products/:code:``* A rota deve remover os produtos com o mesmo código passado por parâmetro.

## Listagem
4.1 - Deve ser possível listar todos os produtos

- *``GET /products``:* Rota que retorna todos os produtos cadastrados</code>.

## Busca
5.1 - Deve ser possível buscar produtos por código no array

5.2 - Deve retornar um status code 204 se não encontrar o produto

- *``GET /products/:code``:* Rota que retorna todos os produtos com o código procurado</code>.

## Lovers
6.1 - Não deve ser possível atualizar o número de lovers de um produto manualmente

6.2 - Deve ser possível dar love em um produto

6.3 - deve possuir o número de lovers igual a 0 um produto recém criado o qual o seu código seja inexistente

6.4 - Um produto deverá herdar o número de lovers caso seu código já exista

6.5 - Produtos de mesmo código devem compartilhar os lovers

- *``POST /products/:code/love``:* Rota que recebe o código dos produtos que receberá um incremente de UM no contador de lovers.

