import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const PostsContext = createContext();

const initialState = {
  allPosts: [],           
  deletedPostIds: [],     
  loading: true,          
  error: null             
};

function postsReducer(state, action) {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, allPosts: action.payload, loading: false };
    
    case 'DELETE_POST':
      return { ...state, deletedPostIds: [...state.deletedPostIds, action.payload] };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    default:
      return state;
  }
}

function PostsProvider({ children }) {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  return (
    <PostsContext.Provider value={{ state, dispatch }}>
      {children}
    </PostsContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within PostsProvider');
  }
  return context;
}

function PostCard({ post, onDelete }) {
  return (
    <div className="relative bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-200">

      <button
        onClick={() => onDelete(post.id)}
        className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors duration-200 shadow-md"
        aria-label="Delete post"
      >
        <X size={16} />
      </button>
      <div className="pr-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded">
            Post #{post.id}
          </span>
          <span className="text-xs text-gray-500">User {post.userId}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2 capitalize leading-tight">
          {post.title}
        </h3> 
        
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {post.body}
        </p>
      </div>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={20} />
      </button>

      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentPage === page
                ? 'bg-blue-500 text-white shadow-md'
                : 'border border-gray-300 hover:bg-gray-100 text-gray-700'
            }`}
          >
            {page}
          </button>
        )
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

function PostsGallery() {
  const { state, dispatch } = usePosts();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        
        setTimeout(() => {
          dispatch({ type: 'SET_POSTS', payload: data });
        }, 5000);
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    };

    fetchPosts();
  }, [dispatch]);

  const availablePosts = state.allPosts.filter(
    post => !state.deletedPostIds.includes(post.id)
  );

  const totalPages = Math.ceil(availablePosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = availablePosts.slice(startIndex, startIndex + postsPerPage);

  const handleDelete = (postId) => {
    dispatch({ type: 'DELETE_POST', payload: postId });
    
    const remainingOnPage = currentPosts.length - 1;
    if (remainingOnPage === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (state.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <p className="text-2xl font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
          <p className="font-semibold">Error: {state.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">POSTS GALLERY - THE COMPLETE GALLERY ALBUMN</h1>
          <p className="text-gray-600">
            Showing {currentPosts.length} of {availablePosts.length} posts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentPosts.map(post => (
            <PostCard key={post.id} post={post} onDelete={handleDelete} />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {availablePosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No posts available at this time..Refresh</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <PostsProvider>
      <PostsGallery />
    </PostsProvider>
  );
}