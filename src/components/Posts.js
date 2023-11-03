import React from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export default function Posts() {
  async function fetchPosts() {
     const { data } = await api.get('/posts');

     console.log('API response:', { data })
     
     return data;
  }

  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data?.map((post) => (
          <li key={post.id}>Post {post.id}</li>
          ))}
      </ul>
    </div>
  )
}