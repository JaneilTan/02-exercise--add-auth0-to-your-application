const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const { celebrate, Joi, errors, Segments } = require("celebrate");
const { auth } = require('express-oauth2-jwt-bearer');
const PropertyModel = require("./models/PropertyModel");
const formatProperty = require("./formatProperty");

const app = express();
const checkJwt = auth({
  audience: 'https://housetricks.com',
  issuerBaseURL: `https://dev-8r4cuew5h4u0t6ck.us.auth0.com/`,
});

app.use(cors());

app.use(express.json());

app.post(
  "/properties",
  checkJwt,
  celebrate({
    [Segments.BODY]: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      address: Joi.string().required(),
      img: Joi.string().required(),
      askingPrice: Joi.number().required().min(0),
    })
  }),
  async (req, res, next) => {
    try {
      const { body } = req;
      const property = new PropertyModel(body);
      await property.save();
      return res.status(201).send(formatProperty(property));
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

app.get("/properties", async (req, res) => {
  const properties = await PropertyModel.find({});
  return res.status(200).send(properties.map(formatProperty));
});

app.get("/properties/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: "bad id" });
  }

  const property = await PropertyModel.findById(id);

  if (property === null) {
    return res.status(404).send("not found");
  }

  return res.status(200).send(formatProperty(property));
});

app.use(errors());

module.exports = app;
