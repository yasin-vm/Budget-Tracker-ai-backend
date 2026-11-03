import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import router from './router/router.js';
import connectDB from './db/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });
const rootEnv = dotenv.config({ path: path.join(__dirname, '../.env') }).parsed || {};
const backendApiKey = process.env.GEMINI_API_KEY?.trim();
const rootApiKey = rootEnv.GEMINI_API_KEY?.trim();
if (
    (!backendApiKey || backendApiKey.toLowerCase() === 'your_gemini_api_key_here')
    && rootApiKey
    && rootApiKey.toLowerCase() !== 'your_gemini_api_key_here'
) {
    process.env.GEMINI_API_KEY = rootApiKey;
}

const app = express();
const PORT = process.env.PORT || 3000;
const geminiApiKey = process.env.GEMINI_API_KEY?.trim();
const hasGeminiApiKey = Boolean(
    geminiApiKey && geminiApiKey.toLowerCase() !== 'your_gemini_api_key_here'
);
const configuredOrigins = process.env.FRONTEND_ORIGINS
    ?.split(',')
    .map(origin => origin.trim())
    .filter(Boolean);
const allowedOrigins = configuredOrigins?.length
    ? configuredOrigins
    : ['http://localhost:3000', 'http://127.0.0.1:3000'];

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

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Budget Tracker API is healthy',
        timestamp: new Date().toISOString()
    });
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../public')));

const startServer = async () => {
    try {
        console.log(
            '[AI Status] Gemini Key Loaded:',
            hasGeminiApiKey ? 'YES ✅' : 'NO ❌ (Check backend/.env)'
        );
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
            console.log(`Dashboard at http://localhost:${PORT}`);
            console.log(`API endpoints at http://localhost:${PORT}/api`);
        });
    } catch (error) {
        console.error('Unable to start server:', error.message);
        process.exitCode = 1;
    }
};

startServer();

export default app;
