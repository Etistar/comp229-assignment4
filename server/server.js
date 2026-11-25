import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express'; // ES6 and newer javascript
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

import authMiddleware from './middlewares/auth.js';

import projectsRoutes from './routes/projects-routes.js';
import userRoutes from './routes/user-routes.js';


// Establish DB Connection
mongoose.connect(process.env.MONGO_URI);
const connection = mongoose.connection; 
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

const app = express(); 

app.use(express.json()); // for parsing application/json

app.get('/api/health', (req, res) => {
    res.json({ ok: true });
});

app.use('/api/projects', authMiddleware, projectsRoutes);
app.use('/api/users', userRoutes);

app.use('/api', (req, res) => {
    res.status(404).json({ message: 'API route not found' });
})

// Serve the static react build files
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


const port = process.env.PORT || 3001;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});