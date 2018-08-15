## Demo

[Expen$es Manager](https://young-anchorage-66382.herokuapp.com/#/)

## Description

Expenses Manager is web application based on REST API that allows you to store your expenses. Each expense is saved to database with such properties as:

- description
- amount
- month 
- year

The app alows user to filter the expenses by particular year and month and also to edit or delete data.
There is both frontend and backend data validation.

## Prerequisites

`nodejs ^8.11.3`

## Instalation

```sh
git clone git@github.com:ErnestZiemkowski/expenses-manager.git
cd expenses-manager/
npm install
cd client/
npm install
```
## Run app locally

Go back to the root directory of expenses-manager

```sh
npm start
```

Than in another terminal window

```sh
npm run client
```

## Stack & Tools

- mongoDB
- mongoose
- express.js
- react.js
- node.js
- mocha.js

## Possible improvements/ further development

- Counting total of expenses made during month and year
- User authorization and authentication
- Customization of e-mail notifications 
- More expense's properties 
