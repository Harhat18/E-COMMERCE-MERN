const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
//Handling Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to Uncaught exceptions`);
  process.exit(1);
});

//Config
dotenv.config({ path: "backend/config/config.env" });

//Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on https://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejectionsü
process.on("unhandledpromiseReject", (err) => {
  console.log(`Error; ${err.message}`);
  console.log(`shutting down the server due to Unhandled Promise Rejections`);
  server.close(() => {
    process.exit(1);
  });
});
