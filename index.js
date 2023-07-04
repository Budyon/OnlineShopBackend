import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import Post from './src/routes/post.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/posts', Post)
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGOURI, (err) => {
  if (!err) console.log('MongoDB has connected successfully.');
});

app.listen(3001)
