const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes');
const cors = require('cors');

const PORT = 5000;

//Connect to mongoDB database
mongoose
.connect(process.env.URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  
  const app = express();

  app.use(cors());
  
  app.use(express.json());

  app.use('/api', routes);

  app.listen(PORT, ()=> {
    console.log(`Server started on http://localhost:${PORT}`)
  });

});

