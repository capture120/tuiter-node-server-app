import express from 'express';
import cors from 'cors';
import "dotenv/config";
import session from "express-session";
import mongoose from "mongoose";
import HelloController from './controllers/hello-controller.js';
import UserController from './controllers/users-controller.js';
import TuitsController from './controllers/tuits-controller.js';
import AuthController from "./controllers/auth-controller.js";

/* connecting to local mongodb database */
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter';
mongoose.connect(CONNECTION_STRING);


const app = express(); // make sure to include the extension

// configure cors right after instantiating express
app.use(cors({
    credentials: true,
    // the url that is allowed to send HTTP requests to this node server
    // prevents HTTP requests from unwanted sites (will not send a response back)
    origin: process.env.FRONTEND_URL, 
}
))

// configure server session after cors
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
// if not in the development environment, set cookies for the production environment to allow 
// for user authentication sessions to be stored and remembered
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));


app.use(express.json()); // parse JSON from HTTP request body
TuitsController(app);
HelloController(app);
UserController(app); // pass it app
app.listen(process.env.PORT || 4000);
AuthController(app);