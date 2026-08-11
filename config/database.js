const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
    try {
        const uri = process.env.DATABASE_URL || process.env.DATABSE_URL;
        const conn = await mongoose.connect(uri, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        logger.info(`Database connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Database connection error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
