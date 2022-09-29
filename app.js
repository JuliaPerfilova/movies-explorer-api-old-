const express = require('express');
const mongoose = require("mongoose");
const {DB_ADDRESS_DEV} = require("./utils/constants");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require("./routes/index");
const {errors} = require("celebrate");
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000, NODE_ENV, DB_ADDRESS } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DB_ADDRESS : DB_ADDRESS_DEV)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database connection successful');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(`Error: ${err}`);
  });

app.use(helmet());

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
