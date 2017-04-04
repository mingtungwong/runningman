'use strict';

const express = require('express');
const app = express();

app.use(express.static('public'));

const port = process.env.PORT || 1337;

app.listen(port, () => console.log(`Listening on port ${port}. Go to localhost:${port} to view the app`));
