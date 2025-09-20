import app from '../index';
import serverless from 'serverless-http';
import connectDB from '../src/config/dbConfig';

(async () => {
    await connectDB();
})();

export default serverless(app);