import express from 'express';
import cors from 'cors';
import "dotenv/config"

import HelloController from './controllers/hello-controller.js';
import UserController from './controllers/users-controller.js';
import TuitsController from './controllers/tuits/tuits-controller.js';

import session from "express-session";
import AuthController from "./controllers/auth-controller.js";

const app = express(); // make sure to include the extension
// configure cors right after instantiating express
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}
))

// configure server session after cors
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
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