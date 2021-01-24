const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const usersRoutes = require('./routes/users-routes');
const toDoListRoutes = require('./routes/todo-list-routes');

// set up express
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on PORT: ${PORT}`));

// set up mongoose
mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log('MongoDB connection established');
  }
);

// set up routes
app.use('/users', usersRoutes);
app.use('/lists', toDoListRoutes);
