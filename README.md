# Developing the iCollect App
### to keep track of our favourite collections

## Step 0 Initialising the project

[X] npx ironlauncher icollect-server --auth --json

## Step 1 Creating the models

[X] Collection model: title, description, owner
[X] Keep Single Source of Truth by removing items from Collection since the Items model will already have a reference by collectionID
[X] Items model: title, description, collectionName
[X] User model: name and password (email is not necessary)

## Step 2 Working on Authentication Routes
[X] /loggedin
[X] /signup
[X] /login
[X] /logout

## Step 3 Creating the Collection and Item routes

[X] Collection Routes (POST, GET, UPDATE)
[X] Items Routes (POST, GET, UPDATE)
[X] Check all the functionality of these routes
 
## Step 4 Handling routes

[X] Updating the app.js file with the routes of the project

## Step 5 Enable CORS and Backend Set-up Authentication
[X] Check the server and client PORTS
[X] Update the config/passport.js and the app.js files to check user's login