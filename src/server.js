const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const v1Router = require('./api/v1');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use('/api/v1', v1Router);
app.use(require('./shorts/shorts.router'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
