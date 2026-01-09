# Posts Gallery App

A React application that displays posts from JSONPlaceholder API with pagination and delete functionality.

## Features

- ✅ Fetches posts from JSONPlaceholder API
- ✅ Displays 6 posts per page
- ✅ Pagination with Previous/Next buttons and direct page navigation
- ✅ Delete posts with automatic reflow (shows next post from next page)
- ✅ 5-second loading screen on startup
- ✅ State management using React Context API
- ✅ Styled with Tailwind CSS
- ✅ Clean code structure with proper component organization

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

## Project Structure

```
task/
├── src/
│   ├── components/
│   │   ├── Card.jsx          # Individual post card component
│   │   ├── Loading.jsx       # Loading screen component
│   │   ├── Pagination.jsx    # Pagination controls
│   │   └── PostList.jsx      # Grid layout for posts
│   ├── context/
│   │   └── PostContext.jsx   # Context API for state management
│   ├── App.jsx               # Main application component
│   ├── index.js              # Application entry point
│   └── index.css             # Tailwind CSS imports and custom styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management
- **JSONPlaceholder** - Mock REST API

## How It Works

1. **Loading**: Shows a loading spinner for 5 seconds while fetching data
2. **Display**: Shows 6 posts in a responsive grid layout
3. **Delete**: Click the red cross icon to remove a post - automatically shows the next post
4. **Pagination**: Navigate between pages using Previous/Next buttons or click specific page numbers
