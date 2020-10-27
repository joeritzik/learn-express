const express = require('express');
const Post = require('./models/Post');
const router = express.Router();

//Get all posts
router.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
})

//Get single post
router.get('/posts/:title', async (req, res) => {
  try {
    const post = await Post.findOne({ title: req.params.title });
    res.send(post);
  } catch(err) {
    res.status(404);
    res.send({error: 'Post doesnt exist'});
  }
});

//Create a Post
router.post('/posts', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    vote: 1
  });
  await post.save();
  res.send(post);
});

//Update a post
// router.patch('/posts/:title', async (req, res) => {
//   try {
//     const post = await Post.findOne({ title: req.params.title });

//     if (req.body.title) {
//       post.title = req.body.title;
//     }

//     if (req.body.content) {
//       post.content = req.body.content;
//     }

//     await post.save();
//     res.send(post);

//   } catch(err) {
//     res.status(404);
//     res.send({error: 'Post doesnt exist'});
//   }
// });

router.put('/posts/:id/:type', async (req, res) => {

  const id = req.params.id;
  const upOrDownvote = req.params.type;
  
  console.log('UPDATE Request')

  try {
    if (upOrDownvote === 'up') {
      const post = await Post.findByIdAndUpdate(id, {
        $inc: { vote: 1 }
      })
      res.send(post)
      res.status(200);
    }
    else if (upOrDownvote === 'down') {
      const post = await Post.findByIdAndUpdate(id, {
        $inc: { vote: -1 }
      })
      res.send(post)
      res.status(200);
    }
  } catch (e) {
    console.log(e);
    res.status(500);
  }
})


//Delete a post
router.delete("/posts/:id", async (req, res) => {
	try {
		await Post.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})


module.exports = router;