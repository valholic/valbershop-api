import serverless from "serverless-http";
import connectDB from "../src/config/dbConfig";

const app = require("../index");

let isConnected = false;

const handler = async (req, res) => {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }
    return app(req, res);
};

export default serverless(handler);
