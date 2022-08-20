"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("multer-test");
    const users = await db
      .collection("users")
      .find({})
      .toArray();

    client.close();

    res.status(200).json({
      status: 200,
      data: users,
    })
  } catch (err) {
    console.log("Error: ", err);
  }
};




module.exports = {
  getUsers
};
