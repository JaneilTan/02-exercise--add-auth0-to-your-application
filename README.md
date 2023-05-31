# 02 Exercise - Add Auth0 to your application

# Scenario

House Tricks have an online application where they can post properties for sale. Recently, some spambots have been creating property listings by filling in the form.

The form and API endpoint need to be secured, so only registered customers can list properties.

Your Tech Lead has insisted that you use [Auth0](https://auth0.com/) to implement authentication in your React application and Express server.

---

## Getting started

### Client

- Open a Terminal in VS Code for this project
- Type `cd client` to change directory into the client folder
- Type `npm install` to install npm dependencies
- Type `npm start` to start the Express Server

### Server

- Open a Terminal in VS Code for this project
- Type `cd server` to change directory into the server folder
- Type `npm install` to install npm dependencies
- Type `npm start` to start the Express Server

### MongoDB Database


- Start MongoDB in Docker by opening a terminal and `copy & paste` in the following: 
```shell
docker run --name 02-exercise-auth0-express-react-mongo_db \
  -p 27017:27017 \
  -v 02-exercise-auth0-express-react-mongo_db_data_container:/data/db \
  -d \
  mongo
```

---
- Connect to MongoDB using [MongoDB Compass](https://www.mongodb.com/products/compass). Create a database named `mongo`, and load data from the [data](./data) folder into the database.
- Don't forget to [connect to MongoDB using Mongoose](https://mongoosejs.com/docs/connections.html) in `server.js`

---

# API specification

To view the documentation for the API specification:

1. Open a Terminal in VS Code for this project
2. Type `cd server` to change directory into the server folder
3. Type `npm run docs` to start a web server with API documentation
4. Open the link displayed in your browser (it's automatically copied to your clipboard)

   ![api docs](docs/api-docs.png)

## Load the API Specification in Insomnia

You can automatically load all the available endpoints in Insomnia.

Watch the [video tutorial](https://www.loom.com/share/dfaf8b47c6924f5ba04ce84dd1bdea1b), or follow the instructions below:

1. Go to the Insomnia Dashboard
2. Click the purple `Create` button
3. Select `File`.
4. Navigate into this exercise folder, and choose `server/e2e/api-spec.yml`.
5. Import as a `Request Collection`.
6. You can then open the House Tricks 1.0 Collection. Insomnia will load the endpoints for you.

---

# User Story

- As the real estate agent for House Tricks
- I want to add a new property to the website
- So potential customers can view and purchase the property

## Acceptance criteria

- Only logged in users can create new properties
- The person who created the property is captured on a `createdBy` field in MongoDB
- The person who created the property is included in the API response for properties (see the API specification)
- The API matches the API Specification

## Technical requirements

- [Auth0](https://auth0.com/) is used for authentication.

---

# Submit your Exercise

- [ ] Commits are pushed to GitHub
- [ ] Automated tests pass in GitHub
- [ ] Exercise is submitted in iQualify
