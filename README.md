# tipgram

## Real-Time Chat App

This is a real-time chat application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It leverages WebSocket technology to enable real-time messaging between users.

## Features

- Real-time messaging using WebSockets.
- User registration and authentication.
- User avatar selection.
- Secure password hashing.
- MongoDB database for data storage.
- Deployed on Netlify (frontend), Render.com (backend), and MongoDB Atlas (database).

## Technologies Used

- Frontend: React
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- WebSocket: Socket.IO
- Deployment: Netlify (frontend), Render.com (backend)

## Demo

You can access the live demo of this chat app at [Live Demo Link](https://tipgram.netlify.app/).

## Screenshots

![Welcome page](./src/assets/tipgramWelcome.png)

![Chat panel](./src/assets/tipgramChat.png)

## Local Setup

To run this chat app locally, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB server(required) and MongoDB compass(optional) should be installed on your local machine.

### Clone the Repository (frontend setup)

```bash
git clone https://github.com/AnmolDotX/tipgramclient
cd tipgramClient
```

### provide backend host

create a .env file and add an environment variable with the name VITE_BACKEND_HOST, and give it the value of your local backend server like this "http://localhost:8000"

```bash
VITE_BACKEND_HOST = "http://localhost:8000"
```

### Install Dependencies

In both the client and server directories, install the required dependencies:

```bash
cd client
npm install
```

#### [NOTE] Before staring the Developement server please go to the tipgramServer[tipgramServer](https://github.com/AnmolDotX/tipgramserver) to setup the backend in your local machine. After you have started you local backend server proceed to:

### Start the Development Server

Remember to start the client and server development servers in separate terminal for convenience:

```bash
# Client
cd tipgramClient
npm run dev
```

The app should now be running locally. Access it in your browser at `http://localhost:5173`.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Your contributions are welcome!
