const mongoose = require("mongoose");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
let dbUrl = process.env.MONGODB_URL;
mongoose.Promise = global.Promise;

mongoose.set("strictQuery", false);
mongoose.connect(dbUrl, options);

const dbConnection = mongoose.connection;

dbConnection.on("connecting", function () {
  console.log("Connecting to  Database...");
});

//Bind connection to error event (to get notification of connection errors)
dbConnection.on("error", function (err) {
  console.log("Could not connect to the database. Exiting now...");
  console.log(err);
  process.exit();
});

dbConnection.once("open", function () {
  console.log("Connection open");
});

dbConnection.on("connected", function () {
  console.log("Connected to Database...");
});

dbConnection.on("disconnected", function () {
  console.log("Database connection is disconnected");
});

dbConnection.on("reconnected", function () {
  console.log("Connection reconnected!");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", async function () {
  try {
    await dbConnection.close();
    console.log("Database connection disconnected through app termination");
    process.exit(0);
  } catch (error) {
    console.error("Error closing database connection:", error);
    process.exit(1);
  }
});
