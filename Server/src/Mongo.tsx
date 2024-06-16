import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI: string = process.env.MONGO_CONN_STRING || '';

if (! mongoURI) {
    console.error("MONGO_CONN_STRING not found in .env");
    process.exit(1);
}

const connectDB = async (): Promise <void> => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return;
    }
};

export default connectDB;