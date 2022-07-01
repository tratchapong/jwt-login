require('dotenv').config()
require('./config/passport');
const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
const notFoundMiddleware = require('./middlewares/notFound')
const errorMiddleware = require('./middlewares/error')
const authRoute = require('./routes/authRoute')
const authenticate = require('./middlewares/authenticate')


const app = express()

app.use(cors())
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoute);

app.use('/profile', authenticate, (req,res,next) => {
  res.json(req.user)
})

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log('server running on port: ' + port));
