# ztcc-api1

## Project - microsservice-account
Z-Tech code challenge, api1.

## Description:
Service responsible to create bank accounts. The service perform tasks such as create a new holder account on database, validate if a holder account is active, deactivate an account, update holder information. Check the current features section to see what you can do by now and the roadmap section for features coming soon.

## Tech stack
This service is built with:
- Typescript
- NodeJS
- Jest
- TypeORM
- Postgres
- Husky
- Docker
- Heroku

## Run Test Suite
Install dependencies:
```
npm install
```
Run all tests with:
```
npm run test
```
Run **unit test**:
```
npm run test:unit
```
Run **integration test**:
```
npm run test:integration
```
Run test **coverage report**:
```
npm run test:cov
```

## Run the project - with Docker

1. Rename **.env-example** file to **.env**, this file will be used by docker-compose

2. Run the app from docker-compose file
```
docker compose up
```

## Features available
    - [x] Create a holder account
    - [x] Check an account status

## Features Roadmap
    - [] Change an account status
    - [] Update an account infos such as first name and last name

## Architecture of this service

## AS IS - DIAGRAM TEAR DOWN COMING SOON
![z-tech-code-challenge drawio](https://user-images.githubusercontent.com/16967470/165403263-6c38271c-59c5-4d24-8250-6682708819dd.png)

## TO BE - DIAGRAM AND DIAGRAM TEAR DOWN COMING SOON
