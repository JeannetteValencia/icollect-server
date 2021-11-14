// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const projectName = "project-management-server";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// Packages used for authentication (Session & Passport)
const session = require('express-session');
const passport = require('passport');

// Passport initial setup
require('./config/passport');

//Session settings: allows our app to maintain the sessions and our users in it
app.use(
  session({
    secret: 'some secret goes here',
    resave: true,
    saveUninitialized: false
  })
);

// To allow our app to use passport for auth
app.use(passport.initialize());
app.use(passport.session());

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const indexRoutes = require("./routes");
app.use("/api", indexRoutes);

const authRouter = require("./routes/auth")
app.use("/api", authRouter);

const collectionRouter = require ("./routes/collection.routes");
app.use("/api", collectionRouter);

const itemRouter = require ("./routes/item.routes");
app.use("/api", itemRouter);



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
