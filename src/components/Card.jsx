import React from 'react';

const Card = ({ post, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative hover:shadow-xl transition-shadow duration-300">
      <button
        onClick={() => onDelete(post.id)}
        className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors duration-200"
        aria-label="Delete post"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="mb-3">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded">
          Post #{post.id}
        </span>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-3 pr-6 capitalize line-clamp-2">
        {post.title}
      </h3>

      <p className="text-gray-600 text-sm line-clamp-4">
        {post.body}
        </p>
    </div>
  );
};

export default Card;
