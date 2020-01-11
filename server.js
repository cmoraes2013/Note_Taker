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

// API Routes
app.get("/api/notes", function(req, res){
    fs.readFile("./db/db.json", function(err,res){
        if (err) throw err;
    }); 
});


app.post("/api/notes", function(req, res) {
    var note= req.body
    console.log(note);
   
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