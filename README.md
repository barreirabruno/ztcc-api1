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

## AS IS:
### Code design
Check this document for the complete explanation of my design decisions.
This project uses a layer separation based on Clean architecture, concepts such as depency injection, inversion control and adapters are applied in the project, you can check reading the diagram and the codebase.

### Database modeling
Check this document for the complete explanation of my database modeling.
For simplicity this proof of concept uses MySQL, by now I'm not dicussing scalability or read/write separation on database level. In my experience this kind of decision is taken in colaboration with a database administrator.

## TO BE:
### Code design
Design and architecture desicisions change with time, here's how I see this architecture decisions evolving for this codebase.

### Database modeling
It's common to add new databases for cache, incomplete data or to provide better experiences on access external dependencies. here's how I see the database needs for this project evolve.

