import express from 'express'
import { Post } from '../schemas/post.js'
import { postDto } from '../dtos/postDto.js'
import { paginateQuery } from '../util.js';

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

router.get('/', async (req, res) => {
    let mongoQuery
    let result 
    let dtoPosts = []
    let objPosts = {}
    let posts 
    if(req.query.search) {
      mongoQuery = Post.find({$or:
      [
        { name: req.query.search },
        { scope: req.query.search },
        { unscoped: req.query.search },
        { description: req.query.search },
        { authorName: req.query.search }
      ]})
        
      posts = await mongoQuery.clone()
      result = await paginateQuery(mongoQuery, req.query.page, req.query.limit);
    } else {
        mongoQuery = Post.find()
        posts = await mongoQuery.clone()
        result = await paginateQuery(mongoQuery, req.query.page, req.query.limit);
      }
        
        result.forEach((element) => {
            let post = new postDto(element)
            dtoPosts.push(post)
        })

        objPosts.total = posts.length
        objPosts.results = dtoPosts
        res.json(objPosts)
});

export default router