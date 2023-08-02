import { Timestamp } from 'mongodb';
import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
  name: { type: String, required: true },
  scope: { type: String, required: true },
  unscoped: { type: String, required: true },
  description: { type: String, required: true },
  authorName: { type: String, required: true },
  image: { type: String },
  date: { type: String }
},{ timestamps: true });

const Post =  mongoose.model('Post', PostSchema);

export { Post }