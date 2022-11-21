
# Fullstack App Bank

#### Copie o repositório
```sh
git clone https://github.com/willianlouza/fullstack-app-bank.git
```
#### Assumindo que você tenha o Docker instalado

```sh
cd fullstack-app-bank
yarn docker:up
//ou
npm run docker:up
```
#### Então faça a 'migration' do banco de dados na imagem Banckend do Docker

```sh
yarn prisma migrate dev --name init
//ou
npx prisma migrate dev --name init
```
![](https://raw.githubusercontent.com/willianlouza/fullstack-app-bank/master/screenshots/docker-cli.png)

## Frontend

#### Com o container rodando, basta acessar:
```sh
localhost:3000
```



## Backend Endpoints

|     Method            |Endpoint                          |Description								|Query|
|----------------|-------------------------------|-----------------------------|-----------------------------
|Post|`"api/auth/register"`            |Create new account            |	none
|Post|`"api/auth/:login"`            |Login with account         | none
|Get          |`"api/account/:id"`|Load target account profile| none
|Post|`"api/transaction/:id"`|Make a transaction| "to" = "destinatário", "value"="valor da transaferência"(from id param)
|Get|"api/transaction/find/:id"| Get account transactions|"type"="any, debit, credit", "start"="start date", end="end date"
