import React from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const api = axios.create({
  baseURL: 'https://api.example.com',
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
     <ul>
        {data?.map((post) => (
          <li key={post.id}>Post {post.id}</li>
        ))}
     </ul>
  )
}