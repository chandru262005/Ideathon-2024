const express = require('express');
const path = require('path');
const app = express();
const port = 3000; // You can choose a different port if needed

const logEvents = require("./logEvents.js");
const EventEmitter = require("events");
class Emitter extends EventEmitter {} //creating a class
const myEmitter = new Emitter();


function myfunc(hislog){
    myEmitter.emit("log", hislog, 'Activities.txt');
}
// Serve static files from the 'static' directory
app.use(express.static(path.join(__dirname, '/static')));

// Define a route to handle GET requests
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// Handle other GET requests (if needed)
app.get('/home', (req, res) => {
    myfunc("Entered home");
    res.send('<h1>Home Page</h1><p>This is the about page.</p>');
});

app.get('/about', (req, res) => {
    myfunc("entered about");
    res.send('<h1>About Page</h1><p>This is the about page.</p>');
});

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'templates', '404.html' ));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


myEmitter.on("log", (msg,fileName) => logEvents(msg,fileName));  //listening to events

