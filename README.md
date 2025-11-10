# RAG Application UI

A modern React chat interface for interacting with a RAG (Retrieval Augmented Generation) backend system. Built with React, Vite, and TailwindCSS.

## Features

- 💬 Real-time chat interface with AI
- 📝 Multiple conversation management
- 🎨 Clean, responsive UI with TailwindCSS
- ⚡ Fast development with Vite
- 🔄 Automatic scrolling and focus management
- ⌨️ Keyboard shortcuts for sending messages

## Tech Stack

- [React](https://react.dev/) - UI Framework
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Axios](https://axios-http.com/) - HTTP client
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## Getting Started

1. Clone the repository
2. Install dependencies:

```sh
npm install
```

3. Start the development server:

```sh
npm run dev
```

## Project Structure

```
src/
├── api.js            # API integration functions
├── App.jsx           # Main application component
├── main.jsx         # Application entry point
├── index.css        # Global styles
└── components/      # UI components
    ├── LeftSide.jsx    # Conversation list sidebar
    ├── MainChat.jsx    # Chat interface
    └── RightSide.jsx   # Reference documents sidebar
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The UI connects to a FastAPI backend running on `http://localhost:8000`. The following API endpoints are used:

- `POST /v1/chat/{session_id}` - Send message to AI
- `GET /sessions` - Get all conversations
- `GET /sessions/{session_id}` - Get specific conversation
- `POST /sessions` - Create new conversation
- `DELETE /sessions/{session_id}` - Delete conversation

## Key Features

### Conversation Management

- Create new conversations
- Switch between existing conversations
- View conversation history
- Real-time updates

### Chat Interface

- Send messages to AI
- View AI responses
- Keyboard shortcuts (Cmd/Ctrl + Enter to send)
- Auto-scrolling to latest messages
- Loading states and error handling

### Styling

- Responsive design
- Clean and modern UI
- Smooth animations with Framer Motion
- Custom scrollbars and focus states

## Development

This project uses:

- ESLint for code linting
- Vite for fast development and building
- React 19 for UI components
- TailwindCSS for styling

## Requirements

- Node.js 16+
- npm or yarn
- Modern web browser

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

```

This README provides a comprehensive overview of your UI project, including setup instructions, project structure, features, and development guidelines. You may want to customize certain sections based on your specific needs or add more details about your implementation.This README provides a comprehensive overview of your UI project, including setup instructions, project structure, features, and development guidelines. You may want to customize certain sections based on your specific needs or add more details about your implementation.
```
