import { createContext, useContext, useState, useEffect } from 'react';

const PostContext = createContext();

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};

export const PostProvider = ({ children }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 6;

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Show loading for 5 seconds
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setAllPosts(data);
        setDisplayedPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(displayedPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = displayedPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Handle post deletion
  const deletePost = (postId) => {
    const updatedPosts = displayedPosts.filter(post => post.id !== postId);
    setDisplayedPosts(updatedPosts);
    
    // Adjust current page if needed
    const newTotalPages = Math.ceil(updatedPosts.length / postsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  // Handle page change
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const value = {
    currentPosts,
    currentPage,
    totalPages,
    loading,
    deletePost,
    goToPage,
    goToNextPage,
    goToPreviousPage,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
