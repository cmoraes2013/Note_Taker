//Dependencies
const express = require ("express");
const path = require ("path");
const fs = require ("fs");
const bodyParser = require('body-parser');  

const app = express();
//Connect to a PORT
const PORT = process.env.PORT || 3000;

//Data Parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json());


//HTML Routes
app.get("/notes", function (req, res){
    res.sendFile(path.join(__dirname, "public/notes.html"));
    console.log("Notes!!");
});
app.get("/", function (req, res){
    res.sendFile(path.join(__dirname, "public/index.html"));
    console.log("Home!!");
});

//API Routes
app.get("/api/notes", function(req, res) {
//This variable is going into db.json file to read the note as an obj in that format
    let noteInfo = fs.readFileSync('./db/db.json');
//Once we get the information needed from the note (title, text), we will parse it out to the server in txt format
    let savedData = JSON.parse(noteInfo);
//When the server can interpret the parsed data, we will send it back as json interpretable by the client side
    res.json(savedData);

});

app.post("/api/notes", function(req, res) {
//These variables will store/grab the data from the text and title input of the note when the user types it in
    let thisNote = [];
    let newNote = {
        title: req.body.title,
        text: req.body.text,
    };
//Once the data is obtained, this variable will go into the db.json file to read the note as an obj in that format--readfile alone gave me error that states its a callback? changed to Sync and error went away
    let noteInfo = fs.readFileSync('./db/db.json');
//This variable will convert the data from the note (title/text) and change it to json so it is interpretable when communicating back and forth from server

//error handling from express.js.com
    try {
        var convertedData = JSON.parse(noteInfo)
        res.json(true);
    } catch (err) {
        var convertedData = {};
    }
//Adds each submitted, parsed note into our empty array of interpretable notes--
    for (let i = 0; i < convertedData.length; i++) {
        thisNote.push(convertedData[i]);
    }
//Displays/Writes the data from the note into our array of saved notes that have been parsed and added to our list
    thisNote.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(thisNote), function(err) {
        if (err) throw err;
    });
});



// app.delete("/api/notes/:id", ()=> {
//     //how they grab of the id from the front end-- 
//     fs.readFile
//     fs.writeFile
//     //when the data comes in your need to add a property and value to id that is not repeated//
    
// })



app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
})