import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '../Components/Input'

export default function PostList() {

  //posts/loading are 2 properties of our state
  //setposts is the function that sets state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) {
      axios.get('http://localhost:5000/posts')
      .then(res => {
        setPosts(res.data.sort((a, b) => b.vote - a.vote));
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
    }
    else {
      console.log('re-render')
    }
  })

  const deletePost = async (id, index) => {
    await axios.delete(`http://localhost:5000/posts/${id}`);
    let currentPosts = posts;
    currentPosts.splice(index, 1);
    setPosts([...currentPosts]);
    console.log(posts)
  }

  const updatePost = async (id, type, index) => {
    if (type === 'up') {
      await axios.put(`http://localhost:5000/posts/${id}/${type}`, {});
      let currentPosts = posts;
      currentPosts[index].vote++;
      currentPosts = currentPosts.sort((a, b) => b.vote - a.vote)
      setPosts([...currentPosts]);
    }
    else if (type === 'down') {
      await axios.put(`http://localhost:5000/posts/${id}/${type}`, {});
      let currentPosts = posts;
      currentPosts[index].vote--;
      currentPosts = currentPosts.sort((a, b) => b.vote - a.vote)
      setPosts([...currentPosts]);
    }
  }

  const addPost = async (content) => {
    if (content === '' || content === undefined) {
      alert('You cannot do that');
      return;
    }
    await axios.post(`http://localhost:5000/posts/`, {
      title: content,
      content: content
    })
    let currentPosts = posts;
    currentPosts.push({
      title: content,
      content: content,
      vote: 1
    })
    setLoading(true);
  }

  return (
    <div>
      <Input addFunction={addPost}/>
      {posts.map((post, index) => {
        return (
          <div key={index}>
            <button onClick={() => { updatePost(post._id, 'up', index) }}>+</button>
            <div>{post.vote}</div>
            <div>{post.title}</div>
            <button onClick={() => { updatePost(post._id, 'down', index) }}>-</button>
            <button onClick={() => { deletePost(post._id, index) }}>Delete</button>
          </div>
        )
      })}
    </div>
  )
}