// Import the express.js library
const express = require('express');
// Import the Node.js built-in 'fs' module to read, write and manipulate files
const fs = require ('fs');
// Import the Node.js built-in 'path' module for working with file and directory paths
const path = require ('path');
// Import the  'db.json' file which acts as a simple database in this application
// By changing const to let, you're allowing db to be reassigned later in your code, which is necessary in your delete route (app.delete('/api/notes/:id', (req, res) => { ... });) where db is reassigned to a new array that excludes the deleted note.
let db = require('./db.json');


// Initialize the express application
const app = express();
// Sets the port to eithee the port number set in the environment variable 'PORT' or to 3000 if 'PORT' is not set
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
// Middleware that parses incoming requests with urlencoded payloads and is based on body-parser
app.use(express.urlencoded({ extended: true }));
// This is a built-in middleware function in Express that parses incoming requests with JSON payloads
app.use(express.json());

// Serving static files such as images, CSS files, and JavaScript files
app.use(express.static('public'));

// Send index.html file
// This sets up a 'GET' request route for the home page ('/). When the homepage is requested, it sends the 'index.html' file.
app.get('/', (req, res) +> {
    res.sendFile(path.join(__dirname, './public/index.html'));

});

// Send notes.html file
// This sets up a "GET' request route for the './notes' page. When the '/notes' page is requested, it sends the 'notes.html' file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Return all saved notes as JSON
// This sets up a GET request route for the '/api/notes' url. When this URL is requested, it responds with the content 'db.json'.
app.get('./api/notes', (req,res) => {
    res.json(db);
}

// Add a new note
// This sets up a POST request route for the '/api/notes' URL. It creates a new note, adds it to the 'db' array, writes the updated array to 'db.json', and then sends the updated 'db.json' content in the response
app.post('/api/notes', (req, res) => {
    newNote.id = db.length + 1;
    db.push(newNote);
    fs.writeFile('./db.json', JSON.stringify(db), (err) => {
        if (err) throw err;
        res.json(db);
    });
});

// Delete a note
// This sets up a DELETE request route for the '/api/notes/:id' URL. It deletes a note with a specific 'id' from the 'db' array, writes the updated array to db.json', then sends the updated 'db.json' content in the response.
app.delete('./api/notes/:id', (req,res) => {
    let noteID = req.params.id;
    db = db.filter(note => note.id != noteId);
    fs.writeFile('./db.json', JSON.stringify(db), (err) => {
        if (err) throw err;
        res._construct.json(db);
    });
});

// This makes Express app listen for requests on the specified port. Once the app is ready to handle requests, it logs a message in the console.
app.listen (PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});