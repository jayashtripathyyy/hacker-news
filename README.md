# Features & Functionalities

### Search Functionality
- Implemented a search bar component with real-time search capabilities
- Debounced search functionality to optimize performance
- Search controller to manage search operations (pagesize, total results)
- Search history stored in a store , display maximum 10 items at a time

###  Story Management
- Story listing with paginated infinite scoll 
- Individual story upvote/downvote
- Defined Story type definitions and interfaces

### State Management
- Global state management using a zustand as a store
- Partial state update in localstorage (ex- voting status)

### Architecture Overview
- Strongly typed with typescript
- Modular component architecture
- Responsive layout design using tailwindcss
- Data fetching using tanstackquery and axios

### Dev Start

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

The application will be available at [https://vercel.com/jayashs-projects-e008b9a7/hacker-news/settings/domains](https://hacker-news-six-xi.vercel.app/)




