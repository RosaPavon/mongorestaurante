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

app.post("/api/nuevoMenu/:numeromenu", function (req, res) {
  db.collection("mesas").insertOne({ numeromenu: parseInt(req.params.numeromenu), primerplato: req.params.primerplato, segundoplato: req.params.segundoplato, postre:req.params.postre, precio:parseInt(req.params.precio) },
    function (error, datos) {
      error
        ? res.send({ error: true, contenido: error })
        : res.send({ error: false, contenido: datos });
    }
  );
});


app.put("/api/editarMenu/:numeromenu", function (req, res) {
    db.collection("mesas").updateOne(
      { numeromenu: req.params.numeromenu },
      { $set: { primerplato: req.params.primerplato2, segundoplato: req.params.segundoplato2, postre:req.params.postre2, precio:parseInt(req.params.precio2)} },
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

  app.delete("/api/borrarMenu/:numeromenu", function (req, res) {
    db.collection("mesas").deleteOne(
      { numeromenu: req.params.numeromenu },
      function (error, datos) {
        error
          ? res.send({ error: true, contenido: error })
          : res.send({ error: false, contenido: datos });
      }
    );
  })

app.listen(3000)
