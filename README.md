[![Build Status](https://travis-ci.org/nparfait101/auto-mart.svg?branch=develop)](https://travis-ci.org/nparfait101/auto-mart)
[![Coverage Status](https://coveralls.io/repos/github/nparfait101/auto-mart/badge.svg?branch=ft-user-login-166294422)](https://coveralls.io/github/nparfait101/auto-mart?branch=ft-user-login-166294422)

# auto-mart

# Description

A project for andela boot camp which is about car dealership, it will enable users to make sells and a buy cars online.

# Github-page

GitHub page (gh-page) of this project accessed using trough https://nparfait101.github.io/auto-mart/

# Requirements

. `NodeJs` Runtime environment that helps to run JavaScript not only in the browser even on the server.
. `Express` As web framework for Node Js.
. `Joi` for API request body error validation.

#Installation

#Setup
You need to have `git`, `NodeJS` and `nmp` installed.
Clone the application on `https://github.com/nparfait101/auto-mart`
`npm install` to install all the dependencies.

# Getting Started

Starting application, Run:
`npm start` for starting the server.

# Testing

npm test for running the tests.

# API ENDPOINTS

POST `/api/v1/cars` Create a new car.
GET `/api/v1/cars` Get all cars.
GET `/api/v1/cars/<id>` Get a specific car by its ID.
PATCH `/api/v1/cars/<id>/price` Edit a specific car price.
DELETE `/api/v1/cars/<id>` Delete a particular car.
POST `/api/v1/orders` Creating a political order.
GET `/api/v1/orders` Retreiving all orders.
GET `/api/v1/orders/<id>` Getting a order for a specific id.
POST `/api/v1/auth/signup` Creating a new user
POST `/api/v1/auth/login` Loging a new User

# Heroku

Visit the link. You can test the above API endpoints using this URL https://auto-mart-v1.herokuapp.com/

# Author

Parfait Ntagungira
