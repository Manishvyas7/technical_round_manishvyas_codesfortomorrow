import React from 'react';
import { PostProvider, usePostContext } from './context/PostContext';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import Loading from './components/Loading';

const AppContent = () => {
  const { loading, currentPosts } = usePostContext();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Posts Gallery</h1>
          <p className="text-gray-600">Browse through our collection of postsv</p>
        </div>
        
        {currentPosts.length > 0 ? (
          <>
            <PostList />
            <Pagination />
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No posts available</p>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <PostProvider>
      <AppContent />
    </PostProvider>
  );
};

export default App;
