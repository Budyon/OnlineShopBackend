import express from 'express'
import { Post } from '../schemas/post.js'
import {postDto} from '../dtos/postDto.js'

const router = express.Router();

router.post('/', async (req, res) => {
    try {
       await Post.create(req.body)
        res.json({
            message: 'Post successfully created'
        })
    } catch (error) {
        console.log(error)
    }
});

const paginateQuery = async (mongoQuery, page, limit) => {
    const skip = (page - 1) * limit
    const results = await mongoQuery.skip(skip).limit(limit)
    return results
}

router.get('/', async (req, res) => {
    const mongoQuery = Post.find()
    const posts = await Post.find();
    const result = await paginateQuery(mongoQuery, req.query.page, req.query.limit);
  
    let dtoPosts = []
    let objPosts = {}
    
    result.forEach((element) => {
        let post = new postDto(element)
        dtoPosts.push(post)
    })
    
    objPosts.total = posts.length
    objPosts.results = dtoPosts
    console.log(dtoPosts)
    res.json(objPosts)
});

export default router