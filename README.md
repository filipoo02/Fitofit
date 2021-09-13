# Fitofit
!THE APP IS BEING PROCESS!
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Test](#test)
* [API](#api)


## General info
App is calculating the walking distance between two inserted addresses. 
User is just to show how it could work with realtion between users and it's activities.

## Technologies
Created in 
- Backend : Node.js with framework Express.js,
- Frontend : PUG (html), CSS, JavaScript,
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

[KEY](https://docs.microsoft.com/en-us/bingmaps/getting-started/bing-maps-dev-center-help/getting-a-bing-maps-key)

Then you can add random walking distance into database by `$ npm run insert:random` or you can do it manualy in mssql.
`$ npm run insert:random` will add random distance from 1 to 15km in current month to the current day.

## API

- GET method `/api/v1/statistics/monthly` - the result will be a monthly distance summed up by day
- GET method `/api/v1/statistics/weekly` - the result will be a weekly distance
- GET method `/api/v1/statistics/weekly/sortDay` - the result will be a weekly distance summed up by day
- POST method `/api/v1/distance/insert` - it will insert into DB the walking distance between two addresses, body:
```
{
 "firstAddress": [street],[city],[country],
 "secondAddress": [street],[city],[country]
}
```
e.g
```
{
 "firstAddress":"piłsudzkiego 2,warszawa,polska",
 "secondAddress":"plac europejski 2,warszawa,polska"
}
```
