# Wealth Watch

Wealth Watch is a MERN stack application with separate client and server folders. The backend is built with MongoDB and Express, while the frontend is developed using Vite, React, TypeScript, Material-UI (MUI), Recharts, and regression.

## Project Structure

```
.
├── client/
└── server/
```

### Backend (server/)

The backend folder contains the Express server and MongoDB configuration.

#### Environment Variables

Make sure to create a `.env` file in the `server/` directory with the following content:

```env
MONGODB_URL="mongodb+srv://<username>:<password>@<cluster>.li0sele.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
PORT=1337
```

Replace `<username>`, `<password>`, and `<cluster>` with your MongoDB credentials.

#### Installation and Setup

1. Navigate to the `server/` directory:

   ```bash
   cd server
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm run dev
   ```

The server will start on the port specified in the `.env` file (default is `1337`).

### Frontend (client/)

The frontend folder contains the Vite React TypeScript application.

#### Installation and Setup

1. Navigate to the `client/` directory:

   ```bash
   cd client
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

The client application will start on the default Vite development server port.

## Additional Information

- **MongoDB:** Ensure your MongoDB cluster is up and running, and the connection string in the `.env` file is correct.
- **Vite:** Vite is used for faster development with React and TypeScript. The project uses various libraries like Material-UI for UI components, Recharts for charts, and regression for statistical analysis.
- **Scripts:** Common scripts for both `client/` and `server/` include `npm install` for installing dependencies and `npm run dev` for starting the development server.

### Running Both Client and Server

To run both the client and server concurrently, you can use tools like `concurrently` or create separate terminal sessions:

1. Open a terminal and start the server:

   ```bash
   cd server
   npm run dev
   ```

2. Open another terminal and start the client:

   ```bash
   cd client
   npm run dev
   ```

Now, both the server and client will be running, and you can interact with your Wealth-Watch application.
