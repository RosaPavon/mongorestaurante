const express = require("express");
const app = express();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

MongoClient.connect(
  "mongodb://localhost:27017",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (error, client) {
    error ? console.log(error) : (db = client.db("mesas"));
  }
);

app.get("/api/menus", function (req, res) {
    db.collection("mesas").find().toArray(function (error, datos) {
        error
          ? res.send({ error: true, contenido: error })
          : res.send({ error: false, contenido: datos });
      });
  });

app.post("/api/nuevoMenu", function (req, res) {
  db.collection("mesas").insertOne({ numeromenu: parseInt(req.body.numeromenu), primerplato: req.body.primerplato, segundoplato: req.body.segundoplato, postre:req.body.postre, precio:parseFloat(req.body.precio) },
    function (error, datos) {
      error
        ? res.send({ error: true, contenido: error })
        : res.send({ error: false, contenido: datos });
    }
  );
});


app.put("/api/editarMenu", function (req, res) {
    db.collection("mesas").updateOne(
      { numeromenu: req.body.numeromenu },
      { $set: { primerplato: req.body.primerplato, segundoplato: req.body.segundoplato, postre:req.body.postre, precio:parseFloat(req.body.precio)} },
      function (error, datos) {
        if (error !== null) {
          console.log(error);
          res.send({ error: true, mensaje: error });
        } else {
          res.send({ error: false, mensaje: datos });
        }
      }
    );
  });

  app.delete("/api/borrarMenu", function (req, res) {
    db.collection("mesas").deleteOne(
      { numeromenu: req.body.numeromenu },
      function (error, datos) {
        error
          ? res.send({ error: true, contenido: error })
          : res.send({ error: false, contenido: datos });
      }
    );
  })

app.listen(3000)
