# Fitofit
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Test](#test)
* [API](#api)


## General info
App is calculating distance between two inserted addresses.

## Technologies
Created in 
- Backend : Node.js with framework Express.js,
- Frontend : HTML (pug engine), CSS, JavaScript,
- Database : MsSQL

## Setup
To run this app you need to install npm packages
`$ npm install`
Also you need to have installed microsoft sql server and add database called FITOFIT.

Then you need to add table for storing activities: 
```
CREATE TABLE [FITOFIT].[dbo].[Activity](
	idAct INT IDENTITY(1,1) PRIMARY KEY,
	idUser INT,
	distance FLOAT,
	dateOfActivcity SMALLDATETIME
)
```

for user:
```
CREATE TABLE [FITOFIT].[dbo].[Users2](
	id INT IDENTITY(1,1) PRIMARY KEY,
	name nvarchar(30)
)
```

## Test
For testing you need to insert new user into User2 table: `INSERT INTO [FITOFIT].[dbo].[Users2](name)values('John')`
and create `config.env` file in main folder with:

```
PORT = 3111
NODE_ENV = prod
DB_SERVER = ----
DB_DATABASE = FITOFIT
DB_USER = ----
DB_PASSWORD = ----
DB_PORT = 1433
KEY = ----
```

PORT is a port on which app will run, [KEY](https://docs.microsoft.com/en-us/bingmaps/getting-started/bing-maps-dev-center-help/getting-a-bing-maps-key)

##API

