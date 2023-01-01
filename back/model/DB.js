const mongoose = require('mongoose');
const express = require('express');

mongoose.connect('mongodb+srv://ibuprect:Lolmdr11@cluster0.3feauch.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));


