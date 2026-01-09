import React from 'react';
import { usePostContext } from '../context/PostContext';
import Card from './Card';

const PostList = () => {
  const { currentPosts, deletePost } = usePostContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {currentPosts.map((post) => (
        <Card key={post.id} post={post} onDelete={deletePost} />
      ))}
    </div>
  );
};

export default PostList;
