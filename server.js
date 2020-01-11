//Dependencies
const express = require ("express");
const path = require ("path");
const fs = require ("fs");

const app = express();
const PORT = process.env.PORT || 3000;

//Data Parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
  

//HTML Routes
app.get("/notes", function (req, res){
    res.sendFile(path.join(__dirname, "notes.html"));
    console.log("Notes!!");
});
app.get("/", function (req, res){
    res.sendFile(path.join(__dirname, "index.html"));
    console.log("Home!!");
});

// API Routes
//  ----ATTEMPT 1------
// app.get("/api/notes", function(req, res){
//     fs.readFile("/db.json", utf8, function(err,data){
//         if (err) throw err;
//     })
// })
//-----ATTEMPT 2------
// app.get("/api/notes", function(req, res) {
//     res.sendFile(path.join(__dirname, "/db/db.json"));
// });
// -----ATTEMPT 3-----
app.get("/api/notes", function (req, res) {
    fs.readFile( __dirname + "/" + "db.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
    });
 })




app.post("/api/notes", (res)=> {
    console.log("Note Posted!");
    var newNote = request.body;
    noteInfo.push(newNote);
    const parsedData = JSON.stringify(noteInfo);
    fs.writeFile(path.join("db.json"), (err) =>{
        if (err) throw err;
        res.json(noteInfo);
})
})

// app.delete("/api/notes/:id", ()=> {
//     //how they grab of the id from the front end-- 
//     fs.readFile
//     fs.writeFile
//     //when the data comes in your need to add a property and value to id that is not repeated//
    
// })







app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
})