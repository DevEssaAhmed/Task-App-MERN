const dotenv = require('dotenv').config();

const express = require('express');
const { default: mongoose } = require('mongoose');
const PORT = process.env.PORT || 5000;
const app = express();
const tasksRouter = require('./routes/taskRoutes');
const cors = require('cors');
// Middleware
// To access the data send from the body we need this middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/v1/tasks', tasksRouter);

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {
    console.log('Connected to Database');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

// mongodb+srv://destinyembark:<password>@cluster0.bfhzsim.mongodb.net/?retryWrites=true&w=majority
