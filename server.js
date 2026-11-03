import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './router/router.js';
import connectDB from './db/db.js';

const app = express();
const PORT = process.env.PORT || 3000;
const configuredOrigins = process.env.FRONTEND_ORIGINS
    ?.split(',')
    .map(origin => origin.trim())
    .filter(Boolean);
const allowedOrigins = configuredOrigins?.length
    ? configuredOrigins
    : ['http://localhost:5500', 'http://127.0.0.1:5500'];

// Middleware
app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error(`Origin ${origin} is not allowed by CORS.`));
    }
}));
app.use(express.json());

// Routes
app.use('/api', router);

app.get('/api', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Budget Tracker API',
        health: '/api/health',
        endpoints: {
            auth: ['/api/signup', '/api/login', '/api/logout'],
            profile: ['/api/profile'],
            transactions: ['/api/transaction'],
            ai: ['/api/ai/parse', '/api/ai/auto-log', '/api/ai/insights', '/api/ai/chat']
        }
    });
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Budget Tracker API is healthy',
        timestamp: new Date().toISOString()
    });
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
            console.log(`API endpoints at http://localhost:${PORT}/api`);
        });
    } catch (error) {
        console.error('Unable to start server:', error.message);
        process.exitCode = 1;
    }
};

startServer();

export default app;
