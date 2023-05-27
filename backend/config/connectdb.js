const mongoose = require("mongoose");

const DB = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(DB, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("Connected with Database succesfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is started running on ${PORT} `);
    });
  } catch (error) {
    console.log(error);
  }
};
