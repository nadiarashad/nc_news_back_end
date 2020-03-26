NC News API
NC News API is a back-end API built to serve the front-end for the Northcoders News Sprint.

About the API
The API serves JSON at the following endpoints

Prerequisites
To run this project locally, Node.js, npm, PostgreSQL and a terminal are required.

Download and install node (this installation will include npm)
Download and install postgresql


Installing
Fork this repo
Clone your forked repo to your local machine
Open your terminal in the project directory and run npm install to install the project's dependencies
Create a file named 'knexfile.js' in the root directory of the project, which configures knex to access your database. 

The file should be as follows:

    const { DB_URL } = process.env;

    module.exports = {
    development: {
    client: "pg",
    connection: {
      database: "nc_knews_dev"
      // password: 'your postgres password (linux only)',
      // username: 'your postgres username (linux only)'
    },
    migrations: {
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    }
    },

    test: {
    client: "pg",
    connection: {
      database: "nc_knews_test"
      // username: 'your postgres username (linux only)',
      // password: 'your postgres password (linux only)'
    },
    migrations: {
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    }
    },
    production: {
    client: "pg",
    connection: `${DB_URL}?ssl=true`,
    migrations: {
      directory: "./migrations",

      seeds: {
        directory: "./seeds"
      }
    }
    }
    };

Run the terminal command npm run seed:run to create an empty database, run migrations files that will create a schema for the database, and seed the database with data from 'db/data/development-data'

Run the terminal command npm run dev to start the server using Nodemon

The server can now be accessed via http requests; e.g. open this link in your web browser to view a list of articles

Running the tests
To run the tests, run the command npm test in your terminal. This will drop any prior test database, create a new one with the latest db schema, and re-seed the test data from 'db/data/test-data' before running tests found in the file 'spec/endpoints.js'.
        
Each describe block represents an endpoint on the api, and each it block creates a new valid or invalid http request to that endpoint. The API responds must match the assertions written in expect statements for the particular test to pass.

All endpoints on the API are tested for possible http requests.

Deployment
This API is hosted on Heroku. 
