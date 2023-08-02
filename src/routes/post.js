import express from 'express'
import { Post } from '../schemas/post.js'
import { postDto } from '../dtos/postDto.js'
import { paginateQuery } from '../util.js';
import multer from 'multer'

// let obj = {
//   name : 'asdas',
//   scope: 'sdasd',
//   unscoped: 'sdasd',
//   description: 'sdad',
//   authorName:'sadasd'
// }

// async function* foo() {
//   for( let i = 0; i < 10; i++) {
//     await Post.create(obj)
//   }
// }
// // for await (const num of foo()){}
// (async () => {
//   for await (const num of foo()) {
//     for( let i = 0; i < 10; i++) {
//       await Post.create(obj)
//     }
//   }
// })();
    
  const router = express.Router();
  let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now()+ '.' + extension)
  }
})
multer({ dest: 'uploads/'})
const upload = multer({ storage : storage })

router.post('/', upload.single('picture'), async (req, res) => {
  try {
      let date = new Date
      let arr = date.toString().split(' ')
      let arrDate = []
      for(let i = 0; i < 5; i++) {
        arrDate.push(arr[i])
      }
      let strDate = arrDate.join(' ')

       await Post.create({
        ...req.body,
        image: req.file ? req.file.filename : null,
        date: strDate
      })
       .then ((item) => {
        if (item) {
          res.status(200).json({
            message: 'Post successfully created'
          })
        } else {
          res.status(404).json({
            error: 'Post Dont Createdddd'
          })
        }
       });
    } catch (error) {
      console.log('error', error);
        res.status(404).json({
          message: 'Post Dont Created'
        })
      }
});

router.get('/', async (req, res) => {
  try {
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
          { description: req.query.search },
          { unscoped: req.query.search },
          { authorName: req.query.search },
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
  } catch (error) {
    console.log(error)
    res.status(404).json({
      message:"Error"
    })
  }
});

export default router