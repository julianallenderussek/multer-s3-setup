require('dotenv').config()
const express = require('express')
const morgan = require("morgan");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const {
  getUsers
} = require("./handlers");

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { uploadFile, getFileStream } = require('./s3')

const app = express()

app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())

// this endpoints will request the image from S3
app.get('/images/:key', async (req, res) => {
  console.log(req.params)
  try {
    const { key } = await req.params
    console.log(key)
    const readStream = getFileStream(key)
    readStream.pipe(res)
  } catch {
    return res.status(404)
  }
})

app.post('/users', upload.single('file'), async (req, res) => {
  const { file } = req
  const { username, email } = req.body
  console.log(username, email)

  if (!username || !email)
    return res.status(400).json({
      status: 400,
      data: req.body,
      message: `Please provide all the information!`,
    });

  const result = await uploadFile(file)
  await unlinkFile(file.path)
  console.log(result)
  
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const userData = {
      username: username,
      email: email,
      image: result.Key
    };

    const db = client.db("multer-test");
    const userResult = await db
      .collection("users")
      .insertOne(userData);
    
    console.log(userResult)
    
    client.close();
    
    res.status(200).json({
      status: 200,
      message: `User Created!`,
    });

  } catch (err) {
    console.log("Error: ", err)
  }
  }
)

app.get('/users', getUsers)

app.listen(8000, () => console.log("listening on port 8000"))