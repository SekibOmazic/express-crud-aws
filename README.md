# A simple REST API with Node JS and Express

## Introduction

This is a code repository for the very simple CRUD REST API. Also contains cloudformation templates for AWS deployment.

## How to use

- get all: `url http://localhost:4000/user`

- read: `curl http://localhost:4000/user/<USER-ID>`

- create: `curl -d '{ "username":"Joe", "age": 30 }' -H "Content-Type: application/json" -X POST http://localhost:4000/user`

- delete: `curl -X DELETE http://localhost:4000/user/<USER-ID>`

- update: `curl -d '{ "username":"Jane", "age": 25 }' -H "Content-Type: application/json" -X PATCH http://localhost:4000/user/<USER-ID>`

## Build docker image

```
docker build -t sekibomazic/simple-express-crud .
docker run -p 4000:4000 -d sekibomazic/simple-express-crud
```

## Deploy to AWS

To learn how to deploy it on AWS using cloudformation please see [tutorial](tutorial.md)
