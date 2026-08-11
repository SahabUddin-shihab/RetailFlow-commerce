require('dotenv').config();
const express = require('express');
const path    = require('path');
const cors    = require('cors');
const morgan  = require('morgan');
const helmet  = require('helmet');

const app = express();


app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }, 
}));


app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'E-Commerce API is running',
        version: '1.0.0',
        env:     process.env.NODE_ENV,
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
});


app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

module.exports = app;
