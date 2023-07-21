import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'dotenv/config'
import path from 'path'
import Post from './src/routes/post.js'
import { fileURLToPath } from 'url';

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "uploads")))

app.use('/posts', Post)

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGOURI, (err) => {
  if (!err) console.log('MongoDB has connected successfully.');
});

app.listen(3001)
