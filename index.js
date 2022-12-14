// inside index.js
const { PORT = 3000 } = process.env
const express = require('express');
const server = express();
const morgan = require('morgan');

server.use(morgan('dev'));

server.use(express.json())

require('dotenv').config();

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});

server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
  });

const apiRouter = require('./api');
server.use('/api', apiRouter);

// stuff below here

// POST /api/users/register
// POST /api/users/login
// DELETE /api/users/:id

// GET /api/posts
// POST /api/posts
// PATCH /api/posts/:id
// DELETE /api/posts/:id

// GET /api/tags
// GET /api/tags/:tagName/posts