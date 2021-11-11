const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '123456',
     database: 'noteapp'
});

app.get('/api/get', (req, res) => {
     const sql = "SELECT * FROM flashcard";
     db.query(sql, (err, result) => {
          if (err) throw err;
          res.send(result);
     });
});

app.post("/api/create", (req, res) => {
     const title = req.body.title;
     const description = req.body.description;
     const time = req.body.time;

     const sql = "INSERT INTO flashcard (title, description, time) VALUES (?, ?, ?)";
     db.query(sql,[title, description, time] ,(err, result) => {
          if (err) throw err;
          console.log(result);
     });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});